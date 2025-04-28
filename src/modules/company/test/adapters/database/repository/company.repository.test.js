import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { Op } from "sequelize";
import { CompanyRepository } from "../../../../adapters/database/repository/company.repository.js";
import { CompanyModel } from "../../../../adapters/database/model/company.model.js";
import { Company } from "../../../../core/entities/company.js";
import { CustomError } from "../../../../../../utils/customError.js";

describe("CompanyRepository", () => {
  let companyRepository;

  beforeEach(() => {
    companyRepository = new CompanyRepository();
    CompanyModel.findOne = jest.fn();
    CompanyModel.create = jest.fn();
    CompanyModel.findAll = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should throw an error if company already exists", async () => {
      CompanyModel.findOne.mockResolvedValueOnce({ cuit: "20-12345678-9" });

      const companyData = {
        cuit: "20-12345678-9",
        social_reason: "Test Company",
        adhesion_date: new Date(),
      };

      await expect(companyRepository.create(companyData)).rejects.toThrow(
        new CustomError("company.error.cuitExists", 400)
      );
    });

    it("should create a new company successfully", async () => {
      CompanyModel.findOne.mockResolvedValueOnce(null);
      CompanyModel.create.mockResolvedValueOnce({
        id: "1",
        cuit: "20-12345678-9",
        social_reason: "Test Company",
        adhesion_date: new Date(),
      });

      const companyData = {
        cuit: "20-12345678-9",
        social_reason: "Test Company",
        adhesion_date: new Date(),
      };

      const result = await companyRepository.create(companyData);

      expect(result).toBeInstanceOf(Company);
      expect(result.cuit).toBe(companyData.cuit);
    });
  });

  describe("findByAdhesionDate", () => {
    it("should return companies with adhesion date ≥ given date", async () => {
      const sinceDate = new Date("2023-01-01");
      const mockCompanies = [
        {
          id: "1",
          cuit: "20-12345678-9",
          social_reason: "Test",
          adhesion_date: new Date(),
        },
      ];
      CompanyModel.findAll.mockResolvedValueOnce(mockCompanies);

      const result = await companyRepository.findByAdhesionDate(sinceDate);

      expect(result).toEqual(mockCompanies);
      expect(CompanyModel.findAll).toHaveBeenCalledWith({
        where: { adhesion_date: { [Op.gte]: sinceDate } },
      });
    });

    it("should return an empty array if no companies found with given adhesion date", async () => {
      const sinceDate = new Date("2023-01-01");
      CompanyModel.findAll.mockResolvedValueOnce([]);

      const result = await companyRepository.findByAdhesionDate(sinceDate);

      expect(result).toEqual([]);
      expect(CompanyModel.findAll).toHaveBeenCalledWith({
        where: { adhesion_date: { [Op.gte]: sinceDate } },
      });
    });
  });
  describe("findByIds", () => {
    it("should return companies by list of IDs", async () => {
      const ids = ["1", "2"];
      const mockCompanies = [
        {
          toJSON: () => ({
            id: "1",
            cuit: "20-12345678-9",
            social_reason: "A",
          }),
        },
        {
          toJSON: () => ({
            id: "2",
            cuit: "20-87654321-9",
            social_reason: "B",
          }),
        },
      ];
      CompanyModel.findAll.mockResolvedValueOnce(mockCompanies);

      const result = await companyRepository.findByIds(ids);

      expect(result).toEqual([
        { id: "1", cuit: "20-12345678-9", social_reason: "A" },
        { id: "2", cuit: "20-87654321-9", social_reason: "B" },
      ]);
      expect(CompanyModel.findAll).toHaveBeenCalledWith({
        where: { id: ids },
      });
    });

    it("should return an empty array if no companies found for given IDs", async () => {
      const ids = ["3", "4"];
      CompanyModel.findAll.mockResolvedValueOnce([]);

      const result = await companyRepository.findByIds(ids);

      expect(result).toEqual([]);
      expect(CompanyModel.findAll).toHaveBeenCalledWith({
        where: { id: ids },
      });
    });
  });

  describe("findById", () => {
    it("should return a company by its ID", async () => {
      const id = "1";
      const mockCompany = {
        toJSON: () => ({
          id: "1",
          cuit: "20-12345678-9",
          social_reason: "Test",
        }),
      };
      CompanyModel.findOne.mockResolvedValueOnce(mockCompany);

      const result = await companyRepository.findById(id);

      expect(result).toEqual({
        id: "1",
        cuit: "20-12345678-9",
        social_reason: "Test",
      });
      expect(CompanyModel.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it("should return null if company not found", async () => {
      const id = "1";
      CompanyModel.findOne.mockResolvedValueOnce(null);

      const result = await companyRepository.findById(id);

      expect(result).toBeNull();
      expect(CompanyModel.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
