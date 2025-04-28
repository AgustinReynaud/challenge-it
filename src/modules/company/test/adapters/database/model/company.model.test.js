import { describe, it, expect } from "@jest/globals";
import { CompanyModel } from "../../../../adapters/database/model/company.model.js";
import { TransferModel } from "../../../../../transfer/adapters/database/model/transfer.model.js";

describe("CompanyModel", () => {
  it("should use the correct table name", () => {
    expect(CompanyModel.getTableName()).toBe("companies");
  });

  it("should define the `id` attribute as UUID primary key", () => {
    const idAttr = CompanyModel.rawAttributes.id;
    expect(idAttr).toBeDefined();
    expect(idAttr.primaryKey).toBe(true);
    expect(idAttr.type.key).toBe("UUID");
  });

  it("should define the `cuit` attribute as non-nullable string with max length 20 and unique", () => {
    const cuitAttr = CompanyModel.rawAttributes.cuit;
    expect(cuitAttr).toBeDefined();
    expect(cuitAttr.allowNull).toBe(false);
    expect(cuitAttr.type.options.length).toBe(20);
    expect(cuitAttr.unique).toBe(true);
  });

  it("should define the `social_reason` attribute as non-nullable string with max length 255", () => {
    const srAttr = CompanyModel.rawAttributes.social_reason;
    expect(srAttr).toBeDefined();
    expect(srAttr.allowNull).toBe(false);
    expect(srAttr.type.options.length).toBe(255);
  });

  it("should define the `adhesion_date` attribute as non-nullable date with default now", () => {
    const adAttr = CompanyModel.rawAttributes.adhesion_date;
    expect(adAttr).toBeDefined();
    expect(adAttr.allowNull).toBe(false);
    expect(adAttr.defaultValue).toBeDefined();
  });

  it("should have a hasMany association to TransferModel on company_id", () => {
    const associations = CompanyModel.associations;
    const assoc = associations.Transfers || associations.transfer;
    expect(assoc).toBeDefined();
    expect(assoc.target).toBe(TransferModel);
    expect(assoc.foreignKey).toBe("company_id");
  });
});
