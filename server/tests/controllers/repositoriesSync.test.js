import { beforeAll, jest, afterAll, beforeEach, afterEach, expect } from "@jest/globals";
import { mongoose } from "#server/models/index.js";
import { mongoOptions } from "#server/env.js";
import { TrendingRepository } from "#server/models/init.js";
import { RepositoriesSyncController } from "#server/controllers/repositoriesSync.js";

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

      clearTimeout(RepositoriesSyncController.autoSyncTimer);
    });

    test("should define a new timer at the end of auto sync", async () => {
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

      await mockRepositoriesSyncController.autoSync();

      expect(mockOctokit.request).toHaveBeenCalledTimes(1);
      expect(mockTrendingRepositoryDeleteMany).not.toHaveBeenCalled();
      expect(mockTrendingRepositoryCreate).not.toHaveBeenCalled();
      expect(RepositoriesSyncController.autoSyncTimer._idleTimeout).toEqual(-1);
    });

    test("should log an error if smth went wrong", async () => {
      mockTrendingRepositoryDeleteMany = jest.spyOn(TrendingRepository, "deleteMany").mockImplementation(() => {
        throw new Error();
      });

      mockRepositoriesSyncController = new RepositoriesSyncController(mockOctokit);

      await mockRepositoriesSyncController.autoSync();

      expect(mockOctokit.request).toHaveBeenCalledTimes(1);
      expect(mockTrendingRepositoryDeleteMany).toHaveBeenCalledTimes(1);
      expect(mockTrendingRepositoryCreate).not.toHaveBeenCalled();
      expect(RepositoriesSyncController.autoSyncTimer._idleTimeout).toEqual(-1);
    });
  });

  // describe("- enable auto synchronization", () => {});

  // describe("- disable auto synchronization", () => {});

  // describe("- get auto synchronization status", () => {});

  // describe("- refresh auto synchronization timer", () => {});

  // describe("- manual synchronization", () => {});
});
