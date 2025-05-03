import request from "supertest";
import { beforeAll, jest, afterAll, beforeEach, afterEach, expect, test } from "@jest/globals";
import { mongoose } from "#server/models/index.js";
import { mongoOptions } from "#server/env.js";
import { TrendingRepository } from "#server/models/init.js";
import { RepositoriesSyncController } from "#server/controllers/repositoriesSync.js";
import { syncReposChunkSize, syncReposLangs, syncReposStars } from "#shared/constants/index.js";

describe("Repositories sync routes:", () => {
  beforeAll(async () => {
    await mongoose.connect(`mongodb://${mongoOptions.host}:${mongoOptions.port}/`, {
      user: mongoOptions.username,
      pass: mongoOptions.password,
      dbName: mongoOptions.database,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("- auto synchronization", () => {
    let mockTrendingRepositoryDeleteMany;
    let mockTrendingRepositoryCreate;
    const mockItems = [
      {
        full_name: "test",
        name: "test",
        git_id: 1234567890,
        owner: {
          login: "test",
        },
        html_url: "https://github.com/test",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        stargazers_count: 1234567890,
        language: "test",
      },
      {
        full_name: "test",
        name: "test",
        git_id: 1234567890,
        owner: {
          login: "test",
        },
        html_url: "https://github.com/test",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        stargazers_count: 1234567890,
        language: "test",
      },
    ];
    let mockOctokit;
    let mockRepositoriesSyncController;

    beforeEach(async () => {
      mockTrendingRepositoryDeleteMany = jest.spyOn(TrendingRepository, "deleteMany").mockImplementation(() => ({}));
      mockTrendingRepositoryCreate = jest.spyOn(TrendingRepository, "create").mockImplementation(() => ({}));
      mockOctokit = {
        request: jest.fn().mockImplementation(async () => ({
          data: {
            items: mockItems,
          },
          status: 200,
        })),
      };
    });

    afterEach(async () => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    test("perform auto sync", async () => {
      mockRepositoriesSyncController = new RepositoriesSyncController(mockOctokit);

      await mockRepositoriesSyncController.autoSync();

      expect(mockOctokit.request).toHaveBeenCalledTimes(3);
      expect(mockTrendingRepositoryDeleteMany).toHaveBeenCalledTimes(3);
      expect(mockTrendingRepositoryCreate).toHaveBeenCalledTimes(6);
      expect(RepositoriesSyncController.autoSyncTimer).toBeDefined();

      clearTimeout(RepositoriesSyncController.autoSyncTimer);
    });

    test("should log an error if auto sync through octokit failed with status code != 200", async () => {
      mockOctokit.request = jest.fn().mockImplementation(async () => ({
        data: {
          items: [],
        },
        status: 400,
      }));

      mockRepositoriesSyncController = new RepositoriesSyncController(mockOctokit);

      await mockRepositoriesSyncController.autoSync().catch(() => {});

      expect(mockOctokit.request).toHaveBeenCalledTimes(1);
      expect(mockTrendingRepositoryDeleteMany).not.toHaveBeenCalled();
      expect(mockTrendingRepositoryCreate).not.toHaveBeenCalled();
      expect(RepositoriesSyncController.autoSyncTimer._idleTimeout).toEqual(-1);
    });

    test("should log an error if smth went wrong", async () => {
      mockTrendingRepositoryDeleteMany = jest.spyOn(TrendingRepository, "deleteMany").mockImplementation(() => {
        throw new Error("Error message!");
      });

      mockRepositoriesSyncController = new RepositoriesSyncController(mockOctokit);

      await mockRepositoriesSyncController.autoSync().catch(() => {});

      expect(mockOctokit.request).toHaveBeenCalledTimes(1);
      expect(mockTrendingRepositoryDeleteMany).toHaveBeenCalledTimes(1);
      expect(mockTrendingRepositoryCreate).not.toHaveBeenCalled();
      expect(RepositoriesSyncController.autoSyncTimer._idleTimeout).toEqual(-1);
    });
  });

  describe("- enable auto synchronization", () => {
    let server;

    beforeEach(async () => {
      server = (await import("#server/server.js")).default;
    });

    afterEach(async () => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    test("should enable auto synchronization if it's disabled, set a new timer and return JSON success response with status code 200", async () => {
      const response = await request(server)
        .post("/api/v1/repos/sync/enable")
        .set({ "Content-Type": "application/json" });

      expect(response.text).toEqual(JSON.stringify({ message: "Auto sync is enabled!" }));
      expect(response.statusCode).toBe(200);

      clearTimeout(RepositoriesSyncController.autoSyncTimer);
    }, 10000);

    test("should not enable auto synchronization if it's already enabled and return JSON success response with status code 200", async () => {
      RepositoriesSyncController.autoSyncTimer = setTimeout(() => {}, 10000);

      const response = await request(server)
        .post("/api/v1/repos/sync/enable")
        .set({ "Content-Type": "application/json" });

      expect(response.text).toEqual(JSON.stringify({ message: "Auto sync is already enabled!" }));
      expect(response.statusCode).toBe(200);

      clearTimeout(RepositoriesSyncController.autoSyncTimer);
    }, 10000);
  });

  describe("- get auto synchronization status", () => {
    let server;

    beforeEach(async () => {
      server = (await import("#server/server.js")).default;
    });

    afterEach(async () => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    test("should return JSON message with auto synchronization status (enabled) and status code 200", async () => {
      RepositoriesSyncController.autoSyncTimer = setTimeout(() => {}, 10000);

      const response = await request(server)
        .get("/api/v1/repos/sync/status")
        .set({ "Content-Type": "application/json" });

      expect(response.text).toEqual(JSON.stringify({ status: "enabled" }));
      expect(response.statusCode).toBe(200);

      clearTimeout(RepositoriesSyncController.autoSyncTimer);
    });

    test("should return JSON message with auto synchronization status (disabled) and status code 200", async () => {
      const response = await request(server)
        .get("/api/v1/repos/sync/status")
        .set({ "Content-Type": "application/json" });

      expect(response.text).toEqual(JSON.stringify({ status: "disabled" }));
      expect(response.statusCode).toBe(200);
    });
  });

  describe("- refresh auto synchronization timer", () => {
    let server;

    beforeEach(async () => {
      server = (await import("#server/server.js")).default;
    });

    afterEach(async () => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    test("should refresh auto synchronization timer if it's enabled, set a new timer and return JSON success response with status code 200", async () => {
      RepositoriesSyncController.autoSyncTimer = setTimeout(() => {}, 10000);
      const mockRefresh = jest.fn().mockImplementation(() => {});
      RepositoriesSyncController.autoSyncTimer.refresh = mockRefresh;

      const response = await request(server)
        .post("/api/v1/repos/sync/refresh")
        .set({ "Content-Type": "application/json" });

      expect(mockRefresh).toHaveBeenCalledTimes(1);
      expect(response.text).toEqual(JSON.stringify({ message: "Auto sync timer is refreshed!" }));
      expect(response.statusCode).toBe(200);

      clearTimeout(RepositoriesSyncController.autoSyncTimer);
    });

    test("should return JSON response message if timer is not enabled with status code 200", async () => {
      RepositoriesSyncController.autoSyncTimer = {};
      const mockRefresh = jest.fn().mockImplementation(() => {});
      RepositoriesSyncController.autoSyncTimer.refresh = mockRefresh;

      const response = await request(server)
        .post("/api/v1/repos/sync/refresh")
        .set({ "Content-Type": "application/json" });

      expect(mockRefresh).not.toHaveBeenCalled();
      expect(response.text).toEqual(JSON.stringify({ message: "Auto sync is disabled!" }));
      expect(response.statusCode).toBe(200);
    });
  });

  describe("- disable auto synchronization", () => {
    let server;

    beforeEach(async () => {
      server = (await import("#server/server.js")).default;
    });

    afterEach(async () => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    test("should disable auto synchronization if it's enabled, clear timer and return JSON success response with status code 200", async () => {
      RepositoriesSyncController.autoSyncTimer = setTimeout(() => {}, 10000);

      const response = await request(server)
        .post("/api/v1/repos/sync/disable")
        .set({ "Content-Type": "application/json" });

      expect(response.text).toEqual(JSON.stringify({ message: "Auto sync is disabled!" }));
      expect(response.statusCode).toBe(200);
    });
  });

  describe("- manual synchronization", () => {
    let mockTrendingRepositoryDeleteMany;
    let mockTrendingRepositoryCreate;
    let server;

    beforeEach(async () => {
      mockTrendingRepositoryDeleteMany = jest.spyOn(TrendingRepository, "deleteMany").mockImplementation(() => ({}));
      mockTrendingRepositoryCreate = jest.spyOn(TrendingRepository, "create").mockImplementation(() => ({}));

      server = (await import("#server/server.js")).default;
    });

    afterEach(async () => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    test("perform manual sync with provided lang and stars and return JSON success response with status code 200", async () => {
      const response = await request(server)
        .post("/api/v1/repos/sync/manual")
        .set({ "Content-Type": "application/json" })
        .send({
          lang: syncReposLangs[2],
          stars: syncReposStars,
        });

      expect(mockTrendingRepositoryDeleteMany).toHaveBeenCalledTimes(1);
      expect(mockTrendingRepositoryCreate).toHaveBeenCalledTimes(syncReposChunkSize);
      expect(response.text).toEqual(JSON.stringify({ message: "Sync completed successfully!" }));
      expect(response.statusCode).toBe(200);
    });

    test("should return JSON response message if ORM failed with status code 400", async () => {
      mockTrendingRepositoryDeleteMany.mockImplementation(() => {
        throw new Error("Error message!");
      });

      const response = await request(server)
        .post("/api/v1/repos/sync/manual")
        .set({ "Content-Type": "application/json" })
        .send({
          lang: syncReposLangs[2],
          stars: syncReposStars,
        });

      expect(mockTrendingRepositoryDeleteMany).toHaveBeenCalledTimes(1);
      expect(mockTrendingRepositoryCreate).not.toHaveBeenCalled();
      expect(response.text).toEqual(JSON.stringify({ message: "Error message!" }));
      expect(response.statusCode).toBe(400);
    });
  });
});
