export class CreateCompanyUseCase {
  constructor(companyRepository) {
    this.companyRepository = companyRepository;
  }

  /**
   * Executes the company creation process.
   * @param {{ cuit: string, social_reason: string }} companyData - Data required to create the company.
   * @returns {Promise<Object>} - The created company.
   */
  async execute({ cuit, social_reason }) {
    return await this.companyRepository.create({ cuit, social_reason });
  }
}
