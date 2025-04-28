import { MESSAGES } from "../../../../../constants/index.js";
import { handleControllerError } from "../../../../../utils/handleControllerError.js";

export class CompanyController {
  constructor({ createCompanyUseCase, getRecentCompaniesUseCase }) {
    this.createCompanyUseCase = createCompanyUseCase;
    this.getRecentCompaniesUseCase = getRecentCompaniesUseCase;
  }

  async create(req, res) {
    const { cuit, social_reason } = req.body;
    const dto = { cuit, social_reason };

    try {
      const newCompany = await this.createCompanyUseCase.execute(dto);

      return res.status(201).json({
        message: req.t(MESSAGES.success.company.create),
        data: newCompany,
        errors: [],
      });
    } catch (err) {
      return handleControllerError(err, req, res);
    }
  }

  async listRecentAdhesions(req, res) {
    try {
      const companies = await this.getRecentCompaniesUseCase.execute();

      return res.status(200).json({
        message: req.t(MESSAGES.success.company.recentAdhesions),
        data: companies,
        errors: [],
      });
    } catch (err) {
      return handleControllerError(err, req, res);
    }
  }
}
