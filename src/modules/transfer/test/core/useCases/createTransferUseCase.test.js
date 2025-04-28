import { CreateTransferUseCase } from "../../../core/useCases/createTransferUseCase.js";
import { Transfer } from "../../../core/entities/Transfer.js";
import { CustomError } from "../../../../../utils/customError.js";
import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";

describe("CreateTransferUseCase", () => {
  let transferRepository;
  let companyRepository;
  let useCase;

  beforeEach(() => {
    transferRepository = {
      create: jest.fn(),
    };
    companyRepository = {
      findById: jest.fn(),
    };
    useCase = new CreateTransferUseCase(transferRepository, companyRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a transfer successfully when valid data is provided", async () => {
    const companyData = { id: "company-1", name: "Company 1" };
    const transferData = {
      amount: 1000,
      company_id: "company-1",
      debit_account: "12345",
      credit_account: "67890",
    };

    companyRepository.findById.mockResolvedValue(companyData);
    transferRepository.create.mockResolvedValue(
      new Transfer({
        ...transferData,
        id: "transfer-1",
        created_at: new Date(),
      })
    );

    const result = await useCase.execute(transferData);

    expect(result).toBeInstanceOf(Transfer);
    expect(result.amount).toBe(1000);
    expect(result.company_id).toBe("company-1");
    expect(transferRepository.create).toHaveBeenCalledWith(transferData);
    expect(companyRepository.findById).toHaveBeenCalledWith("company-1");
  });

  it("should throw an error if the company does not exist", async () => {
    const transferData = {
      amount: 1000,
      company_id: "non-existent-company",
      debit_account: "12345",
      credit_account: "67890",
    };

    companyRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(transferData)).rejects.toThrowError(
      new CustomError("company.error.notFound", 404)
    );
  });
});
