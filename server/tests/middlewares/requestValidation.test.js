import { z } from "zod";
import { afterEach, beforeEach, expect, jest } from "@jest/globals";

describe("Request validation middleware:", () => {
  let validateRequest;
  let schema;
  let req;
  let res;
  let next;

  beforeEach(async () => {
    schema = z.object({
      body: z.object({
        username: z.string().regex(/^[a-zA-Z0-9]{1,16}/gi),
      }),
    });

    req = {};
    next = jest.fn();
    res = {
      status: jest.fn(),
      send: jest.fn(),
      end: jest.fn(),
    };

    jest.unstable_mockModule("#server/utils/errors", () => ({
      badRequestError: jest.fn().mockImplementation(() => {}),
    }));

    validateRequest = (await import("#server/middlewares/requestValidation.js")).default;
  });

  afterEach(async () => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("should call next() middleware if the data is valid", () => {
    req.body = {
      username: "username",
    };

    validateRequest(schema)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  test("should return 400 status code and JSON response if the data is invalid", () => {
    req.body = {
      username: "******",
    };

    validateRequest(schema)(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });
});
