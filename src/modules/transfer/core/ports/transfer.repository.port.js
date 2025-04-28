export class TransferRepositoryPort {
  /**
   * Persist a new transfer.
   * @param {{ amount: number, company_id: string, debit_account: string, credit_account: string }} transferData
   * @returns {Promise<Transfer>}
   */
  // eslint-disable-next-line no-unused-vars
  async create(transferData) {
    throw new Error("Method not implemented.");
  }

  /**
   * Find transfers since a given date.
   * @param {Date} sinceDate
   * @returns {Promise<Transfer[]>}
   */
  // eslint-disable-next-line no-unused-vars
  async findByDateSince(sinceDate) {
    throw new Error("Method not implemented.");
  }
}
