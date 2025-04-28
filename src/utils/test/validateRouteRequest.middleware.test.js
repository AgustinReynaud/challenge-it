import { validateRouteRequest } from "../validateRouteRequest.middleware.js";
import Joi from "joi";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";

describe("validateRouteRequest middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      query: {},
      params: {},
      t: jest.fn((key) => {
        const translations = {
          "validation.error": "Validation error",
          "common.error": "Validation error",
          '"name" is required': '"name" is required',
          '"page" must be a number': '"page" must be a number',
        };
        return translations[key] || key;
      }),
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call next() when validation succeeds", async () => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    req.body = { name: "John" };

    const middleware = validateRouteRequest(schema, "body");

    await middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should respond with 400 when validation fails", async () => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    req.body = {};

    const middleware = validateRouteRequest(schema, "body");

    await middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {},
        message: "Validation error",
        errors: expect.arrayContaining([
          expect.stringContaining('"name" is required'),
        ]),
      })
    );
  });

  it("should validate using a different property like query", async () => {
    const schema = Joi.object({
      page: Joi.number().integer().required(),
    });

    req.query = { page: 2 };

    const middleware = validateRouteRequest(schema, "query");

    await middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should fail validation when wrong property value", async () => {
    const schema = Joi.object({
      page: Joi.number().integer().required(),
    });

    req.query = { page: "abc" };

    const middleware = validateRouteRequest(schema, "query");

    await middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Validation error",
        errors: expect.arrayContaining([
          expect.stringContaining('"page" must be a number'),
        ]),
      })
    );
  });
});
