import { DataTypes } from "sequelize";
import { db } from "../../../../../database/config/config.js";

export const TransferModel = db.define(
  "Transfer",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    debit_account: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    credit_account: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "transfers",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        name: "idx_transfers_created_at",
        fields: ["created_at"],
      },
      {
        name: "idx_transfers_company_id_created_at",
        fields: ["company_id", "created_at"],
      },
    ],
  }
);
