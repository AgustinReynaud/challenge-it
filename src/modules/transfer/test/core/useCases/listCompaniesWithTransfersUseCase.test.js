import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { ListCompaniesWithTransfersUseCase } from "../../../core/useCases/listCompaniesWithTransfersUseCase.js";

describe("ListCompaniesWithTransfersUseCase", () => {
  let transferRepository;
  let companyRepository;
  let useCase;

  beforeEach(() => {
    transferRepository = { findByDateSince: jest.fn() };
    companyRepository = { findByIds: jest.fn() };
    useCase = new ListCompaniesWithTransfersUseCase(
      transferRepository,
      companyRepository
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return companies with transfers created in the last month", async () => {
    const transfers = [
      { company_id: "company-1", amount: 1000 },
      { company_id: "company-2", amount: 500 },
    ];
    const companies = [
      { id: "company-1", name: "Company 1" },
      { id: "company-2", name: "Company 2" },
    ];

    transferRepository.findByDateSince.mockResolvedValue(transfers);
    companyRepository.findByIds.mockResolvedValue(companies);

    const result = await useCase.execute();

    expect(transferRepository.findByDateSince).toHaveBeenCalledTimes(1);
    expect(companyRepository.findByIds).toHaveBeenCalledWith([
      "company-1",
      "company-2",
    ]);
    expect(result).toEqual(companies);
  });

  it("should return an empty list if no transfers are found", async () => {
    transferRepository.findByDateSince.mockResolvedValue([]);
    companyRepository.findByIds.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(transferRepository.findByDateSince).toHaveBeenCalledTimes(1);
    expect(companyRepository.findByIds).toHaveBeenCalledWith([]);
    expect(result).toEqual([]);
  });

  it("should return an empty list if no companies match the transfers", async () => {
    const transfers = [{ company_id: "company-1", amount: 1000 }];
    transferRepository.findByDateSince.mockResolvedValue(transfers);
    companyRepository.findByIds.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(transferRepository.findByDateSince).toHaveBeenCalledTimes(1);
    expect(companyRepository.findByIds).toHaveBeenCalledWith(["company-1"]);
    expect(result).toEqual([]);
  });
});
