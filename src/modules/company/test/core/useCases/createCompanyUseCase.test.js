import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { CreateCompanyUseCase } from "../../../core/useCases/createCompanyUseCase.js";

describe("CreateCompanyUseCase", () => {
  let useCase;
  let mockCompanyRepository;

  beforeEach(() => {
    mockCompanyRepository = { create: jest.fn() };
    useCase = new CreateCompanyUseCase(mockCompanyRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call repository.create with correct data and return created company", async () => {
    const dto = { cuit: "20-12345678-9", social_reason: "Test Company" };
    const createdCompany = { id: "1", ...dto };
    mockCompanyRepository.create.mockResolvedValue(createdCompany);

    const result = await useCase.execute(dto);

    expect(mockCompanyRepository.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(createdCompany);
  });

  it("should propagate errors thrown by the repository", async () => {
    const dto = { cuit: "20-12345678-9", social_reason: "Test Company" };
    const error = new Error("Create failed");
    mockCompanyRepository.create.mockRejectedValue(error);

    await expect(useCase.execute(dto)).rejects.toThrow("Create failed");
    expect(mockCompanyRepository.create).toHaveBeenCalledWith(dto);
  });
});
