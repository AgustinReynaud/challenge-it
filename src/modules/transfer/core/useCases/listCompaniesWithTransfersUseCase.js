export class ListCompaniesWithTransfersUseCase {
  constructor(transferRepository, companyRepository) {
    this.transferRepository = transferRepository;
    this.companyRepository = companyRepository;
  }

  async execute() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const transfers = await this.transferRepository.findByDateSince(
      oneMonthAgo
    );

    // Extraer los company_id de las transferencias
    const transferCompanyIds = [...new Set(transfers.map((t) => t.company_id))];

    // Buscar las empresas que tengan los company_ids obtenidos
    const companiesWithTransfers = await this.companyRepository.findByIds(
      transferCompanyIds
    );

    return companiesWithTransfers;
  }
}
