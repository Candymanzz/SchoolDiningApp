import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USER || "",
  String(process.env.DB_PASSWORD || ""),
  {
    dialect: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
  }
);

export default sequelize;
