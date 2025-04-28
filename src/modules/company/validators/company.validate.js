import Joi from "joi";
import { MESSAGES } from "../../../constants/index.js";

export const validateCompanyToCreate = Joi.object({
  cuit: Joi.string()
    .pattern(/^\d{2}-\d{8}-\d{1}$/)
    .required()
    .messages({
      "string.base": MESSAGES.joi.mustBeString,
      "string.pattern.base": MESSAGES.joi.invalidCuitFormat,
      "string.empty": MESSAGES.joi.requiredField,
      "any.required": MESSAGES.joi.requiredField,
    }),
  social_reason: Joi.string().min(2).max(255).required().messages({
    "string.base": MESSAGES.joi.mustBeString,
    "string.empty": MESSAGES.joi.requiredField,
    "string.min": MESSAGES.joi.stringMin,
    "string.max": MESSAGES.joi.stringMax,
    "any.required": MESSAGES.joi.requiredField,
  }),
});
