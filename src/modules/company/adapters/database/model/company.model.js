import { DataTypes } from "sequelize";
import { db } from "../../../../../database/config/config.js";
import { TransferModel } from "../../../../transfer/adapters/database/model/transfer.model.js";

export const CompanyModel = db.define(
  "Company",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    cuit: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    social_reason: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    adhesion_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "companies",
    timestamps: false,
    indexes: [
      {
        name: "idx_companies_adhesion_date",
        fields: ["adhesion_date"],
      },
    ],
  }
);

CompanyModel.hasMany(TransferModel, { foreignKey: "company_id" });
TransferModel.belongsTo(CompanyModel, { foreignKey: "company_id" });
