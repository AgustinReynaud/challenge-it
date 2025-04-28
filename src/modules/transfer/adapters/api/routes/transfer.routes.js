import express from "express";
import { TransferController } from "../controllers/transfer.controller.js";
import { CreateTransferUseCase } from "../../../core/useCases/createTransferUseCase.js";
import { TransferRepository } from "../../database/repository/transfer.repository.js";
import { CompanyRepository } from "../../../../company/adapters/database/repository/company.repository.js";
import { ListCompaniesWithTransfersUseCase } from "../../../core/useCases/listCompaniesWithTransfersUseCase.js";
import { validateTransferToCreate } from "../../../validators/transfer.validator.js";
import { validateRouteRequest } from "../../../../../utils/validateRouteRequest.middleware.js";

const transferencesRoutes = express.Router();

const repo = new TransferRepository();
const companyRepo = new CompanyRepository();
const createUC = new CreateTransferUseCase(repo, companyRepo);
const listCompaniesUc = new ListCompaniesWithTransfersUseCase(
  repo,
  companyRepo
);

const controller = new TransferController({
  createTransferUseCase: createUC,
  listCompaniesWithTransfersUseCase: listCompaniesUc,
});

transferencesRoutes.post(
  "/",
  validateRouteRequest(validateTransferToCreate, "body"),
  controller.create.bind(controller)
);

transferencesRoutes.get(
  "/recent-companies",
  controller.listCompaniesWithTransfers.bind(controller)
);

export { transferencesRoutes };
