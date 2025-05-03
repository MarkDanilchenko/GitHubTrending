import { Octokit } from "octokit";
import { expressOptions } from "#server/env.js";
import { badRequestError } from "#server/utils/errors.js";
import logger from "#server/services/loggerConfig.js";
import { syncReposChunkSize, syncReposLangs, syncReposStars } from "#shared/constants/index.js";
import { TrendingRepository } from "#server/models/init.js";

export class RepositoriesSyncController {
  static autoSyncTimer = null;

  constructor(octokit) {
    this.octokit = octokit;
  }

  /**
   * Sync trending repositories every 1 hour by default.
   *
   * This method will be called automatically when the server starts and every remaining time
   * after the previous call.
   *
   * @fires TrendingRepository.deleteMany
   * @fires TrendingRepository.create
   * @throws {Error} If the auto sync failed.
   */
  async autoSync() {
    try {
      logger.info("Auto sync started!");

      for (const lang of syncReposLangs) {
        const response = await this.octokit.request("GET /search/repositories", {
          q: `stars:>=${syncReposStars} language:${lang}`,
          sort: "stars",
          order: "desc",
          per_page: syncReposChunkSize,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (response.status !== 200) {
          throw new Error("Auto sync failed!");
        }

        await TrendingRepository.deleteMany({ language: { $regex: new RegExp(`^${lang}$`, "i") } });

        for (const repo of response.data.items) {
          await TrendingRepository.create({
            full_name: repo.full_name,
            name: repo.name,
            git_id: repo.id,
            owner_login: repo.owner.login,
            html_url: repo.html_url,
            description: repo.description ?? "",
            stargazers_count: repo.stargazers_count,
            language: repo.language,
          });
        }
      }

      logger.info("Auto sync finished!");

      RepositoriesSyncController.autoSyncTimer = setTimeout(() => {
        this.autoSync();
      }, expressOptions.autoSyncRemaining * 1000);
    } catch (error) {
      logger.error(`Error: ${error.message}`);

      throw error;
    }
  }

  async autoSyncEnable(req, res) {
    /*
    #swagger.tags = ['Repositories']
    #swagger.summary = 'Enable auto synchronization'
    #swagger.description = 'Enable auto synchronization'
    #swagger.operationId = 'autoSyncEnable'
    #swagger.responses[200] = {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ResponseAutoSyncEnableSchema'
          }
        }
      }
    },
    #swagger.responses[400] = {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Response400Schema'
          }
        }
      }
    }
    */
    try {
      const timer = RepositoriesSyncController.autoSyncTimer;
      let message = "";

      if (timer && timer._idleTimeout > 0) {
        message = "Auto sync is already enabled!";
      } else {
        await this.autoSync();

        message = "Auto sync is enabled!";
      }

      res.status(200);
      res.json({ message });
      res.end();
    } catch (error) {
      badRequestError(res, error.message);
    }
  }

  async autoSyncStatus(req, res) {
    /*
    #swagger.tags = ['Repositories']
    #swagger.summary = 'Get auto synchronization status'
    #swagger.description = 'Get auto synchronization status'
    #swagger.operationId = 'autoSyncStatus'
    #swagger.responses[200] = {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ResponseAutoSyncStatusSchema'
          }
        }
      }
    }
    */
    const timer = RepositoriesSyncController.autoSyncTimer;
    let status;

    if (timer && timer._idleTimeout > 0) {
      status = "enabled";
    } else {
      status = "disabled";
    }

    res.status(200);
    res.json({ status });
    res.end();
  }

  async autoSyncRefresh(req, res) {
    /*
    #swagger.tags = ['Repositories']
    #swagger.summary = 'Refresh auto synchronization timer'
    #swagger.description = 'Refresh auto synchronization timer'
    #swagger.operationId = 'autoSyncRefresh'
    #swagger.responses[200] = {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ResponseAutoSyncRefreshSchema'
          }
        }
      }
    }
    */
    const timer = RepositoriesSyncController.autoSyncTimer;
    let message = "";

    if (timer && timer._idleTimeout > 0) {
      timer.refresh();

      message = "Auto sync timer is refreshed!";
    } else {
      message = "Auto sync is disabled!";
    }

    res.status(200);
    res.json({ message });
    res.end();
  }

  async autoSyncDisable(req, res) {
    /*
    #swagger.tags = ['Repositories']
    #swagger.summary = 'Disable auto synchronization'
    #swagger.description = 'Disable auto synchronization'
    #swagger.operationId = 'autoSyncDisable'
    #swagger.responses[200] = {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ResponseAutoSyncDisableSchema'
          }
        }
      }
    }
    */
    const timer = RepositoriesSyncController.autoSyncTimer;
    if (timer && timer._idleTimeout > 0) {
      clearTimeout(timer);
    }

    res.status(200);
    res.json({ message: "Auto sync is disabled!" });
    res.end();
  }

  async manualSync(req, res) {
    /*
    #swagger.tags = ['Repositories']
    #swagger.summary = 'Manual synchronization'
    #swagger.description = 'Manual synchronization'
    #swagger.operationId = 'manualSync'
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/RequestManualSyncSchema'
          }
        }
      }
    },
    #swagger.responses[200] = {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ResponseManualSyncSchema'
          }
        }
      }
    },
    #swagger.responses[400] = {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Response400Schema'
          }
        }
      }
    }
     */
    try {
      logger.info("Manual sync started!");

      const { lang, stars } = req.body;
      const timer = RepositoriesSyncController.autoSyncTimer;

      if (timer && timer._idleTimeout > 0) {
        timer.refresh();
        logger.info("Auto sync timer is refreshed!");
      }

      const response = await this.octokit.request("GET /search/repositories", {
        q: `stars:>=${stars} language:${lang}`,
        sort: "stars",
        order: "desc",
        per_page: syncReposChunkSize,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Manual sync failed!");
      }

      await TrendingRepository.deleteMany({ language: { $regex: new RegExp(`^${lang}$`, "i") } });

      for (const repo of response.data.items) {
        await TrendingRepository.create({
          full_name: repo.full_name,
          name: repo.name,
          git_id: repo.id,
          owner_login: repo.owner.login,
          html_url: repo.html_url,
          description: repo.description ?? "",
          stargazers_count: repo.stargazers_count,
          language: repo.language,
        });
      }

      logger.info("Manual sync finished!");

      res.status(200);
      res.send(JSON.stringify({ message: "Sync completed successfully!" }));
      res.end();
    } catch (error) {
      badRequestError(res, error.message);
    }
  }
}

const octokit = new Octokit();
const repositoriesSyncController = new RepositoriesSyncController(octokit);

export default repositoriesSyncController;
