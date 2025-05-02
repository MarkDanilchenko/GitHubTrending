import { jest, beforeAll, afterAll, describe, beforeEach, afterEach, expect } from "@jest/globals";
import { mongoose } from "#server/models/index.js";
import { mongoOptions } from "#server/env.js";
import { TrendingRepository } from "#server/models/init.js";
import request from "supertest";

describe("Repositories routes:", () => {
  beforeAll(async () => {
    await mongoose.connect(`mongodb://${mongoOptions.host}:${mongoOptions.port}/`, {
      user: mongoOptions.username,
      pass: mongoOptions.password,
      dbName: mongoOptions.database,
    });

    jest.unstable_mockModule("#server/middlewares/requestValidation.js", () => ({
      default: jest.fn(() => (req, res, next) => {
        req._query = {
          limit: 10,
          offset: 0,
        };
        next();
      }),
    }));
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("- get exact repository", () => {
    let server;
    let mockTrendingRepositoryFindById;
    const repositoryTest = {
      _id: "1234567890qwerty",
      full_name: "test",
      name: "test",
      git_id: 1234567890,
      owner_login: "test",
      html_url: "https://github.com/test",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
      stargazers_count: 1234567890,
      language: "test",
    };

    beforeEach(async () => {
      server = (await import("#server/server.js")).default;
    });

    afterEach(async () => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    test("should return exact repository with status code 200 and given id", async () => {
      mockTrendingRepositoryFindById = jest.spyOn(TrendingRepository, "findById").mockImplementation(() => {
        return repositoryTest;
      });

      const response = await request(server)
        .get(`/api/v1/repos/${repositoryTest._id}`)
        .set({ "Content-Type": "application/json" });

      expect(mockTrendingRepositoryFindById).toHaveBeenCalledWith(repositoryTest._id);
      expect(mockTrendingRepositoryFindById).toHaveLastReturnedWith(repositoryTest);
      expect(response.text).toEqual(JSON.stringify({ repository: repositoryTest }));
      expect(response.statusCode).toBe(200);
    });

    test("should return JSON response message with status code 404 if repository not found", async () => {
      mockTrendingRepositoryFindById = jest.spyOn(TrendingRepository, "findById").mockImplementation(() => {
        return null;
      });

      const response = await request(server)
        .get(`/api/v1/repos/${repositoryTest._id}`)
        .set({ "Content-Type": "application/json" });

      expect(mockTrendingRepositoryFindById).toHaveBeenCalledWith(repositoryTest._id);
      expect(mockTrendingRepositoryFindById).toHaveLastReturnedWith(null);
      expect(response.text).toEqual(JSON.stringify({ message: "Repository not found!" }));
      expect(response.statusCode).toBe(404);
    });

    test("should return JSON response message with status code 400 if smth went wrong", async () => {
      mockTrendingRepositoryFindById = jest.spyOn(TrendingRepository, "findById").mockImplementation(() => {
        throw new Error();
      });

      const response = await request(server)
        .get(`/api/v1/repos/${repositoryTest._id}`)
        .set({ "Content-Type": "application/json" });

      expect(mockTrendingRepositoryFindById).toHaveBeenCalledWith(repositoryTest._id);
      expect(response.text).toEqual(JSON.stringify({ message: "Bad request!" }));
      expect(response.statusCode).toBe(400);
    });
  });

  describe("- get list of repositories", () => {
    let server;
    let mockTrendingRepositoryFindWithChain;
    let mockTrendingRepositoryFind;
    let mockTrendingRepositoryCountDocuments;
    const repositoryListTest = [
      {
        _id: "1234567890qwerty",
        full_name: "test",
        name: "test",
        git_id: 1234567890,
        owner_login: "test",
        html_url: "https://github.com/test",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        stargazers_count: 1234567890,
        language: "test",
      },
      {
        _id: "1234567890qwerty",
        full_name: "test",
        name: "test",
        git_id: 1234567890,
        owner_login: "test",
        html_url: "https://github.com/test",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        stargazers_count: 1234567890,
        language: "test",
      },
    ];

    beforeEach(async () => {
      server = (await import("#server/server.js")).default;
    });

    afterEach(async () => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    test("should return list of repositories with status code 200 and matching query", async () => {
      mockTrendingRepositoryCountDocuments = jest.spyOn(TrendingRepository, "countDocuments").mockImplementation(() => {
        return repositoryListTest.length;
      });

      mockTrendingRepositoryFindWithChain = jest.spyOn(TrendingRepository, "find").mockImplementation(() => ({
        sort: jest.fn().mockImplementation(() => ({
          skip: jest.fn().mockImplementation(() => ({
            limit: jest.fn().mockImplementation(() => repositoryListTest),
          })),
        })),
      }));

      const response = await request(server).get("/api/v1/repos").set({ "Content-Type": "application/json" });

      expect(mockTrendingRepositoryCountDocuments).toHaveBeenCalled();
      expect(mockTrendingRepositoryCountDocuments).toHaveReturnedWith(repositoryListTest.length);
      expect(mockTrendingRepositoryFindWithChain).toHaveBeenCalled();
      expect(response.text).toEqual(
        JSON.stringify({ repositories: repositoryListTest, count: 2, limit: 10, offset: 0 }),
      );
      expect(response.statusCode).toBe(200);
    });

    test("should return JSON response message with status code 400 if smth went wrong", async () => {
      mockTrendingRepositoryCountDocuments = jest.spyOn(TrendingRepository, "countDocuments").mockImplementation(() => {
        throw new Error();
      });

      mockTrendingRepositoryFind = jest.spyOn(TrendingRepository, "find").mockImplementation(() => {
        return repositoryListTest;
      });

      const response = await request(server).get("/api/v1/repos").set({ "Content-Type": "application/json" });

      expect(mockTrendingRepositoryCountDocuments).toHaveBeenCalled();
      expect(mockTrendingRepositoryCountDocuments).toThrow();
      expect(mockTrendingRepositoryFind).not.toHaveBeenCalled();
      expect(response.text).toEqual(JSON.stringify({ message: "Bad request!" }));
      expect(response.statusCode).toBe(400);
    });
  });
});
