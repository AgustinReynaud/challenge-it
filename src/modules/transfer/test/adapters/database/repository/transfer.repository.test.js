import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { Op } from "sequelize";
import { TransferRepository } from "../../../../adapters/database/repository/transfer.repository.js";
import { TransferModel } from "../../../../adapters/database/model/transfer.model.js";
import { Transfer } from "../../../../core/entities/Transfer.js";

describe("TransferRepository", () => {
  let repository;

  beforeEach(() => {
    repository = new TransferRepository();
    TransferModel.create = jest.fn();
    TransferModel.findAll = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should persist and return a Transfer entity", async () => {
      const now = new Date("2025-04-26T14:23:33.938Z");
      const row = {
        id: "t1",
        amount: 500,
        company_id: "c1",
        debit_account: "acc1",
        credit_account: "acc2",
        created_at: now,
      };
      TransferModel.create.mockResolvedValueOnce(row);

      const dto = {
        amount: 500,
        company_id: "c1",
        debit_account: "acc1",
        credit_account: "acc2",
      };
      const result = await repository.create(dto);

      expect(TransferModel.create).toHaveBeenCalledWith({
        amount: 500,
        company_id: "c1",
        debit_account: "acc1",
        credit_account: "acc2",
      });
      expect(result).toBeInstanceOf(Transfer);
      expect(result.created_at).toBe(now);
    });

    it("should propagate errors from the ORM create method", async () => {
      const error = new Error("DB create error");
      TransferModel.create.mockRejectedValueOnce(error);

      await expect(
        repository.create({
          amount: 0,
          company_id: "",
          debit_account: "",
          credit_account: "",
        })
      ).rejects.toThrow("DB create error");
    });
  });

  describe("findByDateSince", () => {
    it("should retrieve and map transfers since a given date", async () => {
      const sinceDate = new Date("2025-03-01");
      const now = new Date("2025-04-26T14:23:33.938Z");
      const rawRows = [
        {
          toJSON: () => ({
            id: "t1",
            amount: 100,
            company_id: "c1",
            debit_account: "d1",
            credit_account: "c1",
            created_at: now,
          }),
        },
        {
          toJSON: () => ({
            id: "t2",
            amount: 200,
            company_id: "c2",
            debit_account: "d2",
            credit_account: "c2",
            created_at: now,
          }),
        },
      ];
      TransferModel.findAll.mockResolvedValueOnce(rawRows);

      const result = await repository.findByDateSince(sinceDate);

      expect(TransferModel.findAll).toHaveBeenCalledWith({
        where: { created_at: { [Op.gte]: sinceDate } },
      });
      expect(result).toEqual(rawRows.map((r) => r.toJSON()));
    });

    it("should propagate errors from the ORM findAll method", async () => {
      const error = new Error("DB find error");
      TransferModel.findAll.mockRejectedValueOnce(error);

      await expect(repository.findByDateSince(new Date())).rejects.toThrow(
        "DB find error"
      );
    });
  });
});
