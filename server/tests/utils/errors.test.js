import { jest } from "@jest/globals";
import { badRequestError, notFoundError } from "#server/utils/errors.js";

describe("Custom errors:", () => {
  const res = {
    status: jest.fn(),
    send: jest.fn(),
    end: jest.fn(),
  };

  describe("- badRequestError", () => {
    test("should return 400 status code and JSON response with the given message", () => {
      badRequestError(res, "Any message!");

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(JSON.stringify({ message: "Any message!" }));
      expect(res.end).toHaveBeenCalled();
    });

    test("should return 400 status code and JSON response with default message", () => {
      badRequestError(res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: "Bad request!" });
      expect(res.end).toHaveBeenCalled();
    });
  });

  describe("- notFoundError", () => {
    test("should return 404 status code and JSON response with the given message", () => {
      notFoundError(res, "Any message!");

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith(JSON.stringify({ message: "Any message!" }));
      expect(res.end).toHaveBeenCalled();
    });

    test("should return 404 status code and JSON response with default message", () => {
      notFoundError(res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: "Not found!" });
      expect(res.end).toHaveBeenCalled();
    });
  });
});
