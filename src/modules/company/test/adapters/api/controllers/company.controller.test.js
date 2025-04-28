import { CompanyController } from "../../../../adapters/api/controllers/company.controller";
import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";

describe("CompanyController", () => {
  let createCompanyUseCaseMock;
  let getRecentCompaniesUseCaseMock;
  let companyController;
  let req;
  let res;

  beforeEach(() => {
    createCompanyUseCaseMock = { execute: jest.fn() };
    getRecentCompaniesUseCaseMock = { execute: jest.fn() };
    companyController = new CompanyController({
      createCompanyUseCase: createCompanyUseCaseMock,
      getRecentCompaniesUseCase: getRecentCompaniesUseCaseMock,
    });

    req = { body: {}, t: jest.fn() };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a company successfully", async () => {
      const fakeCompany = {
        id: "1",
        cuit: "20-12345678-9",
        social_reason: "Test Company",
      };
      req.body = { cuit: "20-12345678-9", social_reason: "Test Company" };
      createCompanyUseCaseMock.execute.mockResolvedValue(fakeCompany);
      req.t.mockReturnValue("company.success.create");

      await companyController.create(req, res);

      expect(createCompanyUseCaseMock.execute).toHaveBeenCalledWith({
        cuit: "20-12345678-9",
        social_reason: "Test Company",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "company.success.create",
        data: fakeCompany,
        errors: [],
      });
    });

    it("should handle error when creating a company", async () => {
      req.body = { cuit: "20-12345678-9", social_reason: "Test Company" };
      createCompanyUseCaseMock.execute.mockRejectedValue(
        new Error("Create error")
      );
      req.t.mockReturnValue("company.create.failure");

      await companyController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "company.create.failure",
        errors: ["Create error"],
        data: {},
      });
    });
  });

  describe("listRecentAdhesions", () => {
    it("should list recent adhesions successfully", async () => {
      const fakeCompanies = [
        { id: "1", cuit: "20-12345678-9", social_reason: "Test Company" },
      ];
      getRecentCompaniesUseCaseMock.execute.mockResolvedValue(fakeCompanies);
      req.t.mockReturnValue("company.success.recentAdhesions");

      await companyController.listRecentAdhesions(req, res);

      expect(getRecentCompaniesUseCaseMock.execute).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "company.success.recentAdhesions",
        errors: [],
        data: fakeCompanies,
      });
    });

    it("should return empty list when no recent adhesions are found", async () => {
      getRecentCompaniesUseCaseMock.execute.mockResolvedValue([]);
      req.t.mockReturnValue("company.success.recentAdhesions");

      await companyController.listRecentAdhesions(req, res);

      expect(getRecentCompaniesUseCaseMock.execute).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "company.success.recentAdhesions",
        errors: [],
        data: [],
      });
    });
  });
});
