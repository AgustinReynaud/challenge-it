export class CustomError extends Error {
  statusCode;
  errorKey;

  constructor(errorKey, statusCode) {
    super();
    this.errorKey = errorKey;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
