import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { GetRecentCompaniesUseCase } from "../../../core/useCases/getRecentCompaniesUseCase";

describe("GetRecentCompaniesUseCase", () => {
  let useCase;
  let mockCompanyRepository;

  beforeEach(() => {
    mockCompanyRepository = {
      findByAdhesionDate: jest.fn(),
    };
    useCase = new GetRecentCompaniesUseCase(mockCompanyRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should list companies that adhered after one month ago", async () => {
    const mockCompanies = [
      { id: "1", cuit: "20-12345678-9", social_reason: "Test SA" },
    ];
    mockCompanyRepository.findByAdhesionDate.mockResolvedValue(mockCompanies);

    const result = await useCase.execute();

    expect(result).toEqual(mockCompanies);
    expect(mockCompanyRepository.findByAdhesionDate).toHaveBeenCalledTimes(1);
  });

  it("should return an empty list if no companies are found", async () => {
    mockCompanyRepository.findByAdhesionDate.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
  });
});
