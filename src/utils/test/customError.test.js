import { CustomError } from "../customError.js";
import { describe, it, expect } from "@jest/globals";

describe("CustomError", () => {
  it("should create a CustomError with the given errorKey and statusCode", () => {
    const errorKey = "company.cuitExists";
    const statusCode = 400;

    const error = new CustomError(errorKey, statusCode);

    expect(error).toBeInstanceOf(CustomError);
    expect(error).toBeInstanceOf(Error);
    expect(error.errorKey).toBe(errorKey);
    expect(error.statusCode).toBe(statusCode);
  });

  it("should inherit from Error and have correct prototype", () => {
    const error = new CustomError("some.error", 500);

    expect(Object.getPrototypeOf(error)).toBe(CustomError.prototype);
  });

  it("should have a message property even if not provided", () => {
    const error = new CustomError("validation.missingField", 400);

    expect(error.message).toBe("");
  });
});
