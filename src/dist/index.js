"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const orm_1 = require("./database/orm");
const port = 3500;
const app = (0, express_1.default)();
orm_1.AppDataSource.initialize()
    .then(() => {
    console.log("Connected");
})
    .catch((error) => console.log(error));
(0, routes_1.default)(app);
app.listen(port, function () {
    console.log(`Running On -> ${port}`);
});
