"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingController = void 0;
const setting_model_1 = require("../models/setting.model");
const orm_1 = require("../database/orm");
class SettingController {
    getSetting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const settingRepository = orm_1.AppDataSource.getRepository(setting_model_1.SettingModel);
            const settingData = yield settingRepository.find();
            try {
                res.status(200).send({
                    status: 200,
                    data: settingData,
                    message: "Successfully Get Data Setting"
                });
            }
            catch (err) {
                res.status(400).send({
                    error: err,
                    message: "Something Went Wrong"
                });
            }
        });
    }
}
exports.SettingController = SettingController;
