import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { MESSAGES } from "../../../../../../constants/index.js";
import { v4 as uuidv4 } from "uuid";
import { TransferController } from "../../../../adapters/api/controllers/transfer.controller.js";

describe("TransferController", () => {
  let controller;
  let mockCreateTransferUseCase;
  let mockListCompaniesWithTransfersUseCase;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockCreateTransferUseCase = { execute: jest.fn() };
    mockListCompaniesWithTransfersUseCase = { execute: jest.fn() };
    controller = new TransferController({
      createTransferUseCase: mockCreateTransferUseCase,
      listCompaniesWithTransfersUseCase: mockListCompaniesWithTransfersUseCase,
    });

    const companyId = uuidv4();
    const debitAccount = uuidv4();
    const creditAccount = uuidv4();

    mockReq = {
      body: {
        amount: 1000,
        company_id: companyId,
        debit_account: debitAccount,
        credit_account: creditAccount,
      },
      t: jest.fn().mockImplementation((key) => {
        const translations = {
          [MESSAGES.success.transferences.create]:
            "Transfer created successfully",
          [MESSAGES.success.transferences.companiesWithTransferences]:
            "Companies listed successfully",
          [MESSAGES.error.common]: "An error occurred",
        };
        return translations[key] || key;
      }),
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a transfer and return success", async () => {
      const mockTransfer = {
        id: uuidv4(),
        amount: 1000,
        company_id: mockReq.body.company_id,
        debit_account: mockReq.body.debit_account,
        credit_account: mockReq.body.credit_account,
      };
      mockCreateTransferUseCase.execute.mockResolvedValue(mockTransfer);

      await controller.create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Transfer created successfully",
        data: mockTransfer,
        errors: [],
      });
    });

    it("should return an error if the transfer creation fails", async () => {
      const errorMessage = "Failed to create transfer";
      mockCreateTransferUseCase.execute.mockRejectedValue(
        new Error(errorMessage)
      );

      await controller.create(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "An error occurred",
        errors: [errorMessage],
        data: {},
      });
    });
  });

  describe("listCompaniesWithTransfers", () => {
    it("should list companies with transfers", async () => {
      const mockCompanies = [
        { id: uuidv4(), name: "Company 1" },
        { id: uuidv4(), name: "Company 2" },
      ];
      mockListCompaniesWithTransfersUseCase.execute.mockResolvedValue(
        mockCompanies
      );

      await controller.listCompaniesWithTransfers(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Companies listed successfully",
        data: mockCompanies,
        errors: [],
      });
    });

    it("should return an error if listing companies with transfers fails", async () => {
      const errorMessage = "Failed to list companies";
      mockListCompaniesWithTransfersUseCase.execute.mockRejectedValue(
        new Error(errorMessage)
      );

      await controller.listCompaniesWithTransfers(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "An error occurred",
        errors: [errorMessage],
        data: {},
      });
    });
  });
});
