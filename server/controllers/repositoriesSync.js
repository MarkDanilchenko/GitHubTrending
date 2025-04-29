import { Octokit } from "octokit";
import { expressOptions } from "#server/env.js";
import { badRequestError } from "#server/utils/errors.js";
import logger from "#server/services/loggerConfig.js";
import { defaultSyncReposLangs, defaultSyncReposStars } from "#shared/constants/index.js";
import { TrendingRepository } from "#server/models/init.js";

class RepositoriesSyncController {
  static autoSyncTimer = null;
  static defaultSyncReposLangs = defaultSyncReposLangs;
  static defaultSyncReposStars = defaultSyncReposStars;

  constructor(octokit) {
    this.octokit = octokit;
  }

  /**
   * Sync trending repositories to the database every 1 hour by default.
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
      for (const lang of RepositoriesSyncController.defaultSyncReposLangs) {
        const response = await this.octokit.request("GET /search/repositories", {
          q: `stars:>=${RepositoriesSyncController.defaultSyncReposStars} language:${lang}`,
          sort: "stars",
          order: "desc",
          per_page: 100,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (response.status !== 200) {
          throw new Error("auto sync failed!");
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

      RepositoriesSyncController.autoSyncTimer = setTimeout(async () => {
        await this.autoSync();
      }, expressOptions.autoSyncRemaining * 1000);
    } catch (error) {
      logger.error(`Error: ${error.message}`);
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
        this.autoSync();

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
      let status;

      if (timer && timer._idleTimeout > 0) {
        status = "enabled";
      } else {
        status = "disabled";
      }

      res.status(200);
      res.json({ status });
      res.end();
    } catch (error) {
      badRequestError(res, error.message);
    }
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
        timer.refresh();

        message = "Auto sync timer is refreshed!";
      } else {
        message = "Auto sync is disabled!";
      }

      res.status(200);
      res.json({ message });
      res.end();
    } catch (error) {
      badRequestError(res, error.message);
    }
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
      if (timer && timer._idleTimeout > 0) {
        clearTimeout(timer);
      }

      res.status(200);
      res.json({ message: "Auto sync is disabled!" });
      res.end();
    } catch (error) {
      badRequestError(res, error.message);
    }
  }

  async manualSync(req, res) {
    try {
    } catch (error) {}
  }
}

const octokit = new Octokit();
const repositoriesSyncController = new RepositoriesSyncController(octokit);

export default repositoriesSyncController;
