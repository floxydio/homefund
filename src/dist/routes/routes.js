"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// import { schemaGraphQL } from '../graphql/schema';
const auth_controller_1 = require("../controllers/auth.controller");
function Routes(app) {
    const authController = new auth_controller_1.AuthController();
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
    app.post("/api/sign-up", authController.SignUp);
    app.post("/api/sign-in", authController.SignIn);
    // app.get("/api/category", getCategory)
    // app.get("/api/virtualaccount", getVirtualAccount)
}
exports.default = Routes;
