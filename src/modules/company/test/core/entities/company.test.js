import { Company } from "../../../core/entities/company";
import { describe, it, expect } from "@jest/globals";

describe("Company Entity", () => {
  describe("Method - create", () => {
    it("should create a Company instance with valid fields", () => {
      const params = {
        id: "1",
        cuit: "20-12345678-9",
        social_reason: "Test Company",
        adhesion_date: new Date(),
      };

      const company = Company.create(params);

      expect(company).toBeInstanceOf(Company);
      expect(company.id).toBe(params.id);
      expect(company.cuit).toBe(params.cuit);
      expect(company.social_reason).toBe(params.social_reason);
      expect(company.adhesion_date).toBe(params.adhesion_date);
    });
  });
});
