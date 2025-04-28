import { describe, it, expect } from "@jest/globals";
import { DataTypes } from "sequelize";
import { CompanyModel } from "../../../../../company/adapters/database/model/company.model.js";
import { TransferModel } from "../../../../adapters/database/model/transfer.model.js";

describe("TransferModel", () => {
  it("should use the correct table name", () => {
    expect(TransferModel.getTableName()).toBe("transfers");
  });

  it("should have timestamps enabled and underscored", () => {
    expect(TransferModel.options.timestamps).toBe(true);
    expect(TransferModel.options.underscored).toBe(true);
  });

  it("should define the `id` attribute as UUID primary key", () => {
    const idAttr = TransferModel.getAttributes().id;
    expect(idAttr).toBeDefined();
    expect(idAttr.primaryKey).toBe(true);
    expect(idAttr.type.key).toBe(DataTypes.UUID.key);
  });

  it("should define the `amount` attribute as non-nullable float", () => {
    const amountAttr = TransferModel.getAttributes().amount;
    expect(amountAttr).toBeDefined();
    expect(amountAttr.allowNull).toBe(false);
    expect(amountAttr.type.key).toBe(DataTypes.FLOAT.key);
  });

  it("should define the `company_id` attribute as non-nullable UUID", () => {
    const cidAttr = TransferModel.getAttributes().company_id;
    expect(cidAttr).toBeDefined();
    expect(cidAttr.allowNull).toBe(false);
    expect(cidAttr.type.key).toBe(DataTypes.UUID.key);
  });

  it("should define the `debit_account` attribute as non-nullable string(50)", () => {
    const debitAttr = TransferModel.getAttributes().debit_account;
    expect(debitAttr).toBeDefined();
    expect(debitAttr.allowNull).toBe(false);
    expect(debitAttr.type.options.length).toBe(50);
    expect(debitAttr.type.key).toBe(DataTypes.STRING.key);
  });

  it("should define the `credit_account` attribute as non-nullable string(50)", () => {
    const creditAttr = TransferModel.getAttributes().credit_account;
    expect(creditAttr).toBeDefined();
    expect(creditAttr.allowNull).toBe(false);
    expect(creditAttr.type.options.length).toBe(50);
    expect(creditAttr.type.key).toBe(DataTypes.STRING.key);
  });

  it("should have a belongsTo association to CompanyModel on company_id", () => {
    const associations = TransferModel.associations;
    const assoc = associations.Company || associations.company;
    expect(assoc).toBeDefined();
    expect(assoc.target).toBe(CompanyModel);
    expect(assoc.foreignKey).toBe("company_id");
  });
});
