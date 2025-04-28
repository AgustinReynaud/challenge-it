export const MESSAGES = Object.freeze({
  joi: {
    requiredField: "validation.joi.requiredField",
    mustBeString: "validation.joi.mustBeString",
    invalidCuitFormat: "validation.joi.invalidCuitFormat",
    stringMin: "validation.joi.stringMin",
    stringMax: "validation.joi.stringMax",
    mustBeNumber: "validation.joi.mustBeNumber",
    amountGreaterThanZero: "validation.joi.amountGreaterThanZero",
    invalidUuidFormat: "validation.joi.invalidUuidFormat",
  },
  success: {
    company: {
      create: "company.success.create",
      recentAdhesions: "company.success.recentAdhesions",
    },
    transferences: {
      create: "transferences.success.create",
      companiesWithTransferences:
        "transferences.success.companiesWithTransferences",
    },
  },
  error: {
    common: "common.error",
  },
});
