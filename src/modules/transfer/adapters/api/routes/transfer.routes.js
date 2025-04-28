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

/**
 * @swagger
 * tags:
 *   name: Transfers
 *   description: Endpoints for managing transfers
 */

/**
 * @swagger
 * /transfer:
 *   post:
 *     summary: Create a new transfer
 *     description: |
 *       Creates a new transfer. The required fields are `amount`, `company_id`, `debit_account`, and `credit_account`. 
 *       If the data is invalid, it returns a 400 error with details about the validation errors.
 *     tags: [Transfers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - company_id
 *               - debit_account
 *               - credit_account
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 1500
 *               company_id:
 *                 type: string
 *                 example: "2a65c743-845f-4634-84d9-7409a390c0bc"
 *               debit_account:
 *                 type: string
 *                 example: "DEBIT001"
 *               credit_account:
 *                 type: string
 *                 example: "CREDIT001"
 *     responses:
 *       201:
 *         description: Transfer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transfer created successfully."
 *                 data:
 *                   type: object
 *                   example:
 *                     id: "uuid"
 *                     amount: 1500
 *                     company_id: "2a65c743-845f-4634-84d9-7409a390c0bc"
 *                     debit_account: "DEBIT001"
 *                     credit_account: "CREDIT001"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *       400:
 *         description: Bad request or validation error.
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
 *                   example: [
 *                     "Amount must be a number",
 *                     "Amount must be greater than zero",
 *                     "Company ID must be a valid UUID",
 *                     "Debit account is required",
 *                     "Credit account is required"
 *                   ]
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
transferencesRoutes.post(
  "/",
  validateRouteRequest(validateTransferToCreate, "body"),
  controller.create.bind(controller)
);

/**
 * @swagger
 * /transfer/recent-companies:
 *   get:
 *     summary: List companies with recent transfers
 *     description: |
 *       Retrieves a list of companies that have made transfers in the last month.
 *       If an error occurs, it returns a 400 or 404 error with details.
 *     tags: [Transfers]
 *     responses:
 *       200:
 *         description: List of companies with recent transfers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   company_id:
 *                     type: string
 *                   company_name:
 *                     type: string
 *       400:
 *         description: Bad request or error retrieving companies
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
 *                   example: ["Error retrieving companies"]
 *                 data:
 *                   type: object
 *                   example: {}
 *       404:
 *         description: No companies found with transfers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No companies with recent transfers found."
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
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
transferencesRoutes.get(
  "/recent-companies",
  controller.listCompaniesWithTransfers.bind(controller)
);

export { transferencesRoutes };
