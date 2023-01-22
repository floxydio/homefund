"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// import { schemaGraphQL } from '../graphql/schema';
const auth_controller_1 = require("../controllers/auth.controller");
const category_controller_1 = require("../controllers/category.controller");
const setting_controller_1 = require("../controllers/setting.controller");
const virtual_account_controller_1 = require("../controllers/virtual_account.controller");
const news_slider_controller_1 = require("../controllers/news_slider.controller");
function Routes(app) {
    const authController = new auth_controller_1.AuthController();
    const categoryController = new category_controller_1.CategoryController();
    const settingController = new setting_controller_1.SettingController();
    const virtualAccountController = new virtual_account_controller_1.VirtualAccountController();
    const newsSliderController = new news_slider_controller_1.NewsSliderController();
    // Middleware
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)());
    // app.use("/graphql", graphqlHTTP({
    //    schema: schemaGraphQL,
    //    graphiql: true
    // }))
    //
    app.get("/", function (req, res) {
        return res.send("Not Found");
    });
    app.get("/api/category", categoryController.getCategory);
    app.get("/api/setting", settingController.getSetting);
    app.get("/api/virtual-account", virtualAccountController.getVirtualAccount);
    app.get("/api/news-slider", newsSliderController.getNewsSlider);
    app.post("/api/sign-up", authController.SignUp);
    app.post("/api/sign-in", authController.SignIn);
}
exports.default = Routes;
