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
});
