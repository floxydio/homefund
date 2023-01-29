"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const port = 3500;
const app = (0, express_1.default)();
(0, routes_1.default)(app);
app.listen(port, function () {
    console.log(`Running On -> ${port}`);
});
