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

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Endpoints to manage company entities.
 */

/**
 * @swagger
 * /company:
 *   post:
 *     summary: Create a new company
 *     description: |
 *       Creates a new company record in the system.
 *       
 *       Validates the input data according to the following rules:
 *       - **CUIT** must be a string and match the format `XX-XXXXXXXX-X` (e.g., "20-40757957-0").
 *       - **Social Reason** must be a non-empty string between 2 and 255 characters.
 *       
 *       If validation fails or if a company with the provided CUIT already exists, a 400 error will be returned.
 *       
 *       **Possible Validation Errors**:
 *       - **CUIT**:
 *         - Must be a string.
 *         - Must match the format XX-XXXXXXXX-X.
 *         - Is required.
 *       - **Social Reason**:
 *         - Must be a string.
 *         - Is required.
 *         - Must have at least 2 characters.
 *         - Must have at most 255 characters.
 *       - **CUIT duplication**:
 *         - A company with this CUIT already exists.
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cuit
 *               - social_reason
 *             properties:
 *               cuit:
 *                 type: string
 *                 description: Company CUIT (format XX-XXXXXXXX-X)
 *                 example: "20-40757957-0"
 *               social_reason:
 *                 type: string
 *                 description: Company legal name
 *                 example: "Rollos SE"
 *     responses:
 *       201:
 *         description: Company created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Company successfully created."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     cuit:
 *                       type: string
 *                     social_reason:
 *                       type: string
 *                     adhesion_date:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Validation errors or CUIT already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred."
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   examples:
 *                     ValidationErrors:
 *                       summary: Validation errors
 *                       value: [
 *                         "CUIT must be a string.",
 *                         "CUIT must match the format XX-XXXXXXXX-X.",
 *                         "CUIT is required.",
 *                         "Social Reason must be a string.",
 *                         "Social Reason is required.",
 *                         "Social Reason must have at least 2 characters.",
 *                         "Social Reason must have at most 255 characters."
 *                       ]
 *                     DuplicateCUIT:
 *                       summary: CUIT already exists
 *                       value: [
 *                         "A company with this CUIT already exists."
 *                       ]
 *                 data:
 *                   type: object
 *                   example: {}
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Internal server error."]
 *                 data:
 *                   type: object
 *                   example: {}
 */
companyRoutes.post(
  "/",
  validateRouteRequest(validateCompanyToCreate, "body"),
  companyController.create.bind(companyController)
);

/**
 * @swagger
 * /company/recent-adhesions:
 *   get:
 *     summary: List recent companies that have adhered in the last month
 *     description: |
 *       Retrieves a list of companies that have adhered to the system in the last month.
 *       If an error occurs, the system will return a 400 error with the error details in the response body.
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: List of companies that adhered in the last month
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   cuit:
 *                     type: string
 *                   social_reason:
 *                     type: string
 *                   adhesion_date:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Bad request or internal validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred."
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Validation failed."]
 *                 data:
 *                   type: object
 *                   example: {}
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Internal server error."]
 *                 data:
 *                   type: object
 *                   example: {}
 */
companyRoutes.get(
  "/recent-adhesions",
  companyController.listRecentAdhesions.bind(companyController)
);

export { companyRoutes };
