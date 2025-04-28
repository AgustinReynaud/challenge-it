import Joi from "joi";
import { MESSAGES } from "../../../constants/index.js";

export const validateTransferToCreate = Joi.object({
  amount: Joi.number().positive().required().messages({
    "number.base": MESSAGES.joi.mustBeNumber,
    "number.positive": MESSAGES.joi.amountGreaterThanZero,
    "any.required": MESSAGES.joi.requiredField,
  }),
  company_id: Joi.string().uuid({ version: "uuidv4" }).required().messages({
    "string.base": MESSAGES.joi.mustBeString,
    "string.guid": MESSAGES.joi.invalidUuidFormat,
    "any.required": MESSAGES.joi.requiredField,
  }),
  debit_account: Joi.string().max(50).required().messages({
    "string.base": MESSAGES.joi.mustBeString,
    "string.empty": MESSAGES.joi.requiredField,
    "string.max": MESSAGES.joi.stringMax,
    "any.required": MESSAGES.joi.requiredField,
  }),
  credit_account: Joi.string().max(50).required().messages({
    "string.base": MESSAGES.joi.mustBeString,
    "string.empty": MESSAGES.joi.requiredField,
    "string.max": MESSAGES.joi.stringMax,
    "any.required": MESSAGES.joi.requiredField,
  }),
});
