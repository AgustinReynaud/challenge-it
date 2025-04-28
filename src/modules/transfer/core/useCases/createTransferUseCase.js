import { CustomError } from "../../../../utils/customError.js";

export class CreateTransferUseCase {
  constructor(transferRepository, companyRepository) {
    this.transferRepository = transferRepository;
    this.companyRepository = companyRepository;
  }

  /**
   * Create a new transfer.
   * @param {{ amount: number, company_id: string, debit_account: string, credit_account: string }} dto
   * @returns {Promise<Transfer>}
   * @throws {Error} if required fields are missing
   */
  async execute(dto) {
    const company = await this.companyRepository.findById(dto.company_id);
    if (!company) {
      throw new CustomError("company.error.notFound", 404);
    }

    return await this.transferRepository.create(dto);
  }
}
