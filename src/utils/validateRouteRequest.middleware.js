export const validateRouteRequest = (schema, property = "body") => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req[property], { abortEarly: false });
      next();
    } catch (err) {
      res.status(400).json({
        data: {},
        message: req.t("validation.error"),
        errors: err.details.map((e) => req.t(e.message)),
      });
    }
  };
};
