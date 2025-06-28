const { DataSource } = require("typeorm");
require("reflect-metadata");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "password",
  database: process.env.POSTGRES_DB || "squad8_db",
  synchronize: process.env.NODE_ENV === "development", // Auto-sync schema in development
  logging: process.env.NODE_ENV === "development",
  entities: ["entities/**/*.js"], // Path to your entity files
  migrations: ["migrations/**/*.js"], // Path to your migration files
  subscribers: ["subscribers/**/*.js"], // Path to your subscriber files
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Initialize the data source
const initializeTypeORM = async () => {
  try {
    await AppDataSource.initialize();
    console.log("PostgreSQL connected via TypeORM");
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    process.exit(1);
  }
};

module.exports = { AppDataSource, initializeTypeORM }; 