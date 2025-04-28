import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const { DB_USER, DB_PASS, DB_NAME, DB_HOST } = process.env;

/**
 * Database configuration from environment variables.
 * @type {{ username: string, password: string, database: string, host: string, dialect: string }}
 */
export const config = {
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  host: DB_HOST,
  dialect: "mysql",
};

/**
 * Sequelize instance for database operations.
 * @type {import('sequelize').Sequelize}
 */
export const db = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: config.dialect,
    host: config.host,
  }
);
