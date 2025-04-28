export class CompanyRepositoryPort {
  /**
   * Persists a new Company in the database.
   * @param {Object} company - The company data to create.
   * @throws {Error} Method not implemented.
   */
  // eslint-disable-next-line no-unused-vars
  create(company) {
    throw new Error("Not implemented");
  }

  /**
   * Finds companies whose adhesion date is after the specified date.
   * @param {Date} date - The minimum adhesion date.
   * @returns {Promise<Object[]>} - A promise that resolves to a list of companies.
   * @throws {Error} Method not implemented.
   */
  // eslint-disable-next-line no-unused-vars
  findByAdhesionDateAfter(date) {
    throw new Error("Not implemented");
  }

  /**
   * Finds companies by a list of IDs.
   * @param {string[]} ids - List of company IDs.
   * @returns {Promise<Object[]>} - A promise that resolves to a list of companies.
   * @throws {Error} Method not implemented.
   */
  // eslint-disable-next-line no-unused-vars
  async findByIds(ids) {
    throw new Error("Method not implemented.");
  }
}
