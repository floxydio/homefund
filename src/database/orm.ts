import { DataSource } from "typeorm";
import dotenv from "dotenv"
import { UserModel } from "../models/users.model";
import { NewsSliderModel } from "../models/news_slider.model";
import { CategoryModel } from "../models/category.model";
import { VirtualAccountModel } from "../models/virtual_account.model";
import { SettingModel } from "../models/setting.model";
import { HistoryModel } from "../models/history_qrscanner.model";

dotenv.config()

export const AppDataSource = new DataSource({
  type: "mysql",
  host: `${process.env.DB_HOST}`,
  port: Number(process.env.DB_PORT),
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  synchronize: true, // False if already migration
  entities: [UserModel, NewsSliderModel, CategoryModel, VirtualAccountModel, SettingModel, HistoryModel],
  logging: true,
});


AppDataSource.initialize()
  .then(() => {
    console.log("Connected")
  })
  .catch((error) => console.log(error))

