import { CustomError } from "./customError.js";

export function handleControllerError(err, req, res) {
  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  const translatedError =
    err instanceof CustomError ? req.t(err.errorKey) : err.message;

  return res.status(statusCode).json({
    message: req.t("common.error"),
    errors: [translatedError],
    data: {},
  });
}
