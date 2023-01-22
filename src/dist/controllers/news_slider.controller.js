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
exports.NewsSliderController = void 0;
const orm_1 = require("../database/orm");
const news_slider_model_1 = require("../models/news_slider.model");
class NewsSliderController {
    getNewsSlider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newsSliderRepository = orm_1.AppDataSource.getRepository(news_slider_model_1.NewsSliderModel);
            const newsSliderData = yield newsSliderRepository.find();
            try {
                res.status(200).send({
                    status: 200,
                    data: newsSliderData,
                    message: "Successfully Get List News"
                });
            }
            catch (err) {
                res.status(400).send({
                    status: 400,
                    error: err,
                    message: "Something Went Wrong"
                });
            }
        });
    }
}
exports.NewsSliderController = NewsSliderController;
