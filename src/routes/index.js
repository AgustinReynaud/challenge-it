import express from "express";
import { companyRoutes } from "../modules/company/adapters/api/routes/company.routes.js";
import { transferencesRoutes } from "../modules/transfer/adapters/api/routes/transfer.routes.js";

const appRoutes = express.Router();

appRoutes.use("/company", companyRoutes);
appRoutes.use("/transferences", transferencesRoutes);

export { appRoutes };
