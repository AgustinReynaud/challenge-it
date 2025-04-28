import express from "express";
import { CompanyRepository } from "../../database/repository/company.repository.js";
import { CreateCompanyUseCase } from "../../../core/useCases/createCompanyUseCase.js";
import { GetRecentCompaniesUseCase } from "../../../core/useCases/getRecentCompaniesUseCase.js";
import { CompanyController } from "../controllers/company.controller.js";
import { CompanyModel } from "../../database/model/company.model.js";
import { validateCompanyToCreate } from "../../../validators/company.validate.js";
import { validateRouteRequest } from "../../../../../utils/validateRouteRequest.middleware.js";

const companyRoutes = express.Router();

companyRoutes.use(express.json());

const companyRepo = new CompanyRepository(CompanyModel);
const createCompanyUC = new CreateCompanyUseCase(companyRepo);
const getRecentCompaniesUC = new GetRecentCompaniesUseCase(companyRepo);
const companyController = new CompanyController({
  createCompanyUseCase: createCompanyUC,
  getRecentCompaniesUseCase: getRecentCompaniesUC,
});

companyRoutes.post(
  "/",
  validateRouteRequest(validateCompanyToCreate, "body"),
  companyController.create.bind(companyController)
);
companyRoutes.get(
  "/recent-adhesions",
  companyController.listRecentAdhesions.bind(companyController)
);

export { companyRoutes };
