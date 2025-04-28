import { Transfer } from "../../../core/entities/Transfer.js";
import { describe, it, expect } from "@jest/globals";

describe("Transfer.create", () => {
  it("creates a Transfer when all required props are provided", () => {
    const dto = {
      id: "123",
      amount: 1000,
      company_id: "company-1",
      debit_account: "12345",
      credit_account: "67890",
      created_at: new Date(),
    };
    const tr = Transfer.create(dto);
    expect(tr).toBeInstanceOf(Transfer);
    expect(tr.amount).toBe(1000);
    expect(tr.company_id).toBe("company-1");
  });

  it("throws if no data is provided", () => {
    expect(() => Transfer.create({})).toThrow(
      "Missing required fields to create a Transfer"
    );
  });

  it("throws if amount is missing", () => {
    expect(() =>
      Transfer.create({
        company_id: "company-1",
        debit_account: "12345",
        credit_account: "67890",
      })
    ).toThrow("Missing required fields to create a Transfer");
  });

  it("throws if company_id is missing", () => {
    expect(() =>
      Transfer.create({
        amount: 1000,
        debit_account: "12345",
        credit_account: "67890",
      })
    ).toThrow("Missing required fields to create a Transfer");
  });

  it("throws if debit_account is missing", () => {
    expect(() =>
      Transfer.create({
        amount: 1000,
        company_id: "company-1",
        credit_account: "67890",
      })
    ).toThrow("Missing required fields to create a Transfer");
  });

  it("throws if credit_account is missing", () => {
    expect(() =>
      Transfer.create({
        amount: 1000,
        company_id: "company-1",
        debit_account: "12345",
      })
    ).toThrow("Missing required fields to create a Transfer");
  });
});
