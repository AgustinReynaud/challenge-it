import { Op } from "sequelize";
import { CompanyRepositoryPort } from "../../../core/ports/company.repository.port.js";
import { Company } from "../../../core/entities/company.js";
import { CompanyModel } from "../model/company.model.js";
import { CustomError } from "../../../../../utils/customError.js";

export class CompanyRepository extends CompanyRepositoryPort {
  /**
   * Creates a new company in the database.
   * @param {{ cuit: string, socialReason: string, adhesionDate: Date }} companyData
   * @returns {Promise<Company>}
   */
  async create(companyData) {
    const existingCompany = await CompanyModel.findOne({
      where: { cuit: companyData.cuit },
    });

    if (existingCompany) {
      throw new CustomError("company.error.cuitExists", 400);
    }

    const company = await CompanyModel.create({
      cuit: companyData.cuit,
      social_reason: companyData.social_reason,
    });

    return Company.create({
      id: company.id,
      cuit: company.cuit,
      social_reason: company.social_reason,
      adhesion_date: company.adhesion_date,
    });
  }

  /**
   * Returns companies whose adhesion date is greater than or equal to the provided date.
   * @param {Date} sinceDate
   * @returns {Promise<Company[]>}
   */
  async findByAdhesionDate(sinceDate) {
    const rows = await CompanyModel.findAll({
      where: { adhesion_date: { [Op.gte]: sinceDate } },
    });

    return rows;
  }

  /**
   * Find companies by a list of IDs.
   * @param {Array<string>} ids - List of company IDs to search for.
   * @returns {Promise<Array<Object>>} - List of found companies.
   */
  async findByIds(ids) {
    const companies = await CompanyModel.findAll({
      where: {
        id: ids,
      },
    });
    return companies.map((company) => company.toJSON());
  }

  /**
   * Find a company by its ID.
   * @param {string} id - The ID of the company to find.
   * @returns {Promise<Company|null>} - The found company or null if not found.
   */
  async findById(id) {
    const company = await CompanyModel.findOne({
      where: {
        id: id,
      },
    });

    if (!company) {
      return null;
    }

    return company.toJSON();
  }
}
