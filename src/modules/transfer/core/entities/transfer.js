export class Transfer {
  constructor({
    id,
    amount,
    company_id,
    debit_account,
    credit_account,
    created_at,
  }) {
    this.id = id;
    this.amount = amount;
    this.company_id = company_id;
    this.debit_account = debit_account;
    this.credit_account = credit_account;
    this.created_at = created_at;
  }

  /**
   * Factory method to validate and create a Transfer domain entity.
   * @param {{ id?: string, amount: number, company_id: string, debit_account: string, credit_account: string, created_at?: Date }} props
   * @returns {Transfer}
   * @throws {Error} if required fields are missing
   */
  static create({
    id,
    amount,
    company_id,
    debit_account,
    credit_account,
    created_at,
  }) {
    return new Transfer({
      id,
      amount,
      company_id,
      debit_account,
      credit_account,
      created_at,
    });
  }
}
