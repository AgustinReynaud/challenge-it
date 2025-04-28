export async function up(queryInterface) {
  await queryInterface.addIndex("transfers", ["created_at"], {
    name: "idx_transfers_created_at",
  });

  await queryInterface.addIndex("transfers", ["company_id", "created_at"], {
    name: "idx_transfers_company_id_created_at",
  });
}

export async function down(queryInterface) {
  await queryInterface.removeIndex("transfers", "idx_transfers_created_at");
  await queryInterface.removeIndex(
    "transfers",
    "idx_transfers_company_id_created_at"
  );
}
