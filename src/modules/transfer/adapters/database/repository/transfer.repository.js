import { Op } from "sequelize";
import { TransferRepositoryPort } from "../../../core/ports/transfer.repository.port.js";
import { Transfer } from "../../../core/entities/Transfer.js";
import { TransferModel } from "../model/transfer.model.js";

export class TransferRepository extends TransferRepositoryPort {
  /**
   * Persists a new transfer into the database.
   * @param {{ amount: number, company_id: string, debit_account: string, credit_account: string }} transferData - Data of the transfer to create.
   * @returns {Promise<Transfer>} - Created transfer entity.
   */
  async create(transferData) {
    const row = await TransferModel.create({
      amount: transferData.amount,
      company_id: transferData.company_id,
      debit_account: transferData.debit_account,
      credit_account: transferData.credit_account,
    });

    return Transfer.create({
      id: row.id,
      amount: row.amount,
      company_id: row.company_id,
      debit_account: row.debit_account,
      credit_account: row.credit_account,
      created_at: row.created_at,
    });
  }

  /**
   * Retrieves all transfers created since the provided date.
   * @param {Date} sinceDate - Date from which to search transfers.
   * @returns {Promise<Object[]>} - List of transfers.
   */
  async findByDateSince(sinceDate) {
    const rows = await TransferModel.findAll({
      where: {
        created_at: {
          [Op.gte]: sinceDate,
        },
      },
    });

    return rows.map((row) => row.toJSON());
  }
}
