export class Company {
  /**
   * Creates a Company instance.
   * @param {Object} params
   * @param {string} params.id - Company ID.
   * @param {string} params.cuit - Company CUIT.
   * @param {string} params.social_reason - Company social reason.
   * @param {Date} params.adhesion_date - Company adhesion date.
   */
  constructor({ id, cuit, social_reason, adhesion_date }) {
    this.id = id;
    this.cuit = cuit;
    this.social_reason = social_reason;
    this.adhesion_date = adhesion_date;
  }

  /**
   * Factory method to create a new Company.
   * @param {Object} params
   * @param {string} params.id - Company ID.
   * @param {string} params.cuit - Company CUIT.
   * @param {string} params.social_reason - Company social reason.
   * @param {Date} params.adhesion_date - Company adhesion date.
   * @returns {Company}
   */
  static create({ id, cuit, social_reason, adhesion_date }) {
    return new Company({ id, cuit, social_reason, adhesion_date });
  }
}
