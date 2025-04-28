export class GetRecentCompaniesUseCase {
  constructor(companyRepository) {
    this.companyRepository = companyRepository;
  }

  /**
   * Executes the retrieval of companies that adhered within the last month.
   * @returns {Promise<Object[]>} - List of recently adhered companies.
   */
  async execute() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return await this.companyRepository.findByAdhesionDate(oneMonthAgo);
  }
}
