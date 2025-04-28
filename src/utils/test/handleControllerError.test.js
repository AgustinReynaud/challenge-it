import { handleControllerError } from "../handleControllerError.js";
import { CustomError } from "../customError.js";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";

describe("handleControllerError", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      t: jest.fn((key) => key),
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should handle CustomError correctly", () => {
    const error = new CustomError("company.cuitExists", 400);

    handleControllerError(error, req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(req.t).toHaveBeenCalledWith("company.cuitExists");
    expect(req.t).toHaveBeenCalledWith("common.error");
    expect(res.json).toHaveBeenCalledWith({
      message: "common.error",
      errors: ["company.cuitExists"],
      data: {},
    });
  });

  it("should handle generic Error correctly", () => {
    const error = new Error("Unexpected error");

    handleControllerError(error, req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "common.error",
      errors: ["Unexpected error"],
      data: {},
    });
  });

  it("should fallback to status 500 if error is not a CustomError", () => {
    const error = { message: "Something bad happened" };

    handleControllerError(error, req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "common.error",
      errors: ["Something bad happened"],
      data: {},
    });
  });
});
