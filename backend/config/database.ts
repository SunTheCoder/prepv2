import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME!,    // Database name
  process.env.DB_USER!,    // Database username
  process.env.DB_PASS!,    // Database password
  {
    host: process.env.DB_HOST, // Database host
    dialect: "postgres",  // Specify PostgreSQL as dialect
    logging: false,       // Optional: Disable logging
  }
);

export default sequelize;
