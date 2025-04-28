import { MESSAGES } from "../../../../../constants/index.js";
import { handleControllerError } from "../../../../../utils/handleControllerError.js";

export class TransferController {
  constructor({ createTransferUseCase, listCompaniesWithTransfersUseCase }) {
    this.createTransferUseCase = createTransferUseCase;
    this.listCompaniesWithTransfersUseCase = listCompaniesWithTransfersUseCase;
  }

  async create(req, res) {
    const { amount, company_id, debit_account, credit_account } = req.body;
    try {
      const newTransfer = await this.createTransferUseCase.execute({
        amount,
        company_id,
        debit_account,
        credit_account,
      });

      return res.status(201).json({
        message: req.t(MESSAGES.success.transferences.create),
        data: newTransfer,
        errors: [],
      });
    } catch (err) {
      return handleControllerError(err, req, res);
    }
  }

  async listCompaniesWithTransfers(req, res) {
    try {
      const companies = await this.listCompaniesWithTransfersUseCase.execute();

      return res.status(200).json({
        message: req.t(
          MESSAGES.success.transferences.companiesWithTransferences
        ),
        data: companies,
        errors: [],
      });
    } catch (err) {
      return handleControllerError(err, req, res);
    }
  }
}
