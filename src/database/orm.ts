import { DataSource } from "typeorm";
import dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  synchronize: true, // False if already migration
  logging: true,
});
