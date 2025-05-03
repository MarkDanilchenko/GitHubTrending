import request from "supertest";
import fs from "fs";
import { afterEach, beforeEach, jest } from "@jest/globals";

describe("Common routes:", () => {
  describe("- test route to verify that server is running", () => {
    let server;

    beforeEach(async () => {
      server = (await import("#server/server.js")).default;
    });

    afterEach(async () => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    test("should return JSON response message with status code 200", async () => {
      const response = await request(server).get("/test").set({ "Content-Type": "application/json" });

      expect(response.text).toEqual(JSON.stringify({ message: "test" }));
      expect(response.statusCode).toBe(200);
    });
  });

  describe("- 404 route", () => {
    let server;

    beforeEach(async () => {
      server = (await import("#server/server.js")).default;
    });

    afterEach(async () => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    test("should return JSON response message with status code 404", async () => {
      const response = await request(server).get("/wrong_endpoint").set({ "Content-Type": "application/json" });

      expect(response.text).toEqual(JSON.stringify({ message: "Resource is not found" }));
      expect(response.statusCode).toBe(404);
    });
  });

  describe("- json swagger doc. route", () => {
    let server;

    beforeEach(async () => {
      server = (await import("#server/server.js")).default;
    });

    afterEach(async () => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    test("should return json swagger api doc", async () => {
      const swaggerDocs = await fs.promises.readFile("./server/docs/swagger-output.json", { encoding: "utf-8" });

      const response = await request(server)
        .get("/api/v1/docs/swagger-output.json")
        .set({ "Content-Type": "application/json" });

      expect(response.text).toEqual(JSON.stringify(JSON.parse(swaggerDocs)));
      expect(response.statusCode).toBe(200);
    });
  });
});
