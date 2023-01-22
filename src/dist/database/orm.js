"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const users_model_1 = require("../models/users.model");
const news_slider_model_1 = require("../models/news_slider.model");
const category_model_1 = require("../models/category.model");
const virtual_account_model_1 = require("../models/virtual_account.model");
const setting_model_1 = require("../models/setting.model");
const history_qrscanner_1 = require("../models/history_qrscanner");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: `${process.env.DB_HOST}`,
    port: Number(process.env.DB_PORT),
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    synchronize: true,
    entities: [users_model_1.UserModel, news_slider_model_1.NewsSliderModel, category_model_1.CategoryModel, virtual_account_model_1.VirtualAccountModel, setting_model_1.SettingModel, history_qrscanner_1.HistoryModel],
    logging: true,
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Connected");
})
    .catch((error) => console.log(error));
