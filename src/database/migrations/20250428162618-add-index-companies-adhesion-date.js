export async function up(queryInterface) {
  await queryInterface.addIndex("companies", ["adhesion_date"], {
    name: "idx_companies_adhesion_date",
  });
}

export async function down(queryInterface) {
  await queryInterface.removeIndex("companies", "idx_companies_adhesion_date");
}
