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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_model_1 = require("./../models/users.model");
const orm_1 = require("../database/orm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    SignIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = orm_1.AppDataSource.getRepository(users_model_1.UserModel);
            const resultData = yield userRepository.find({
                where: {
                    username: req.body.username
                }
            });
            let resultBcrypt = bcrypt_1.default.compareSync(req.body.password, resultData[0].password);
            if (resultBcrypt) {
                let token = jsonwebtoken_1.default.sign({
                    data: {
                        id: resultData[0].id,
                        username: resultData[0].username,
                    },
                }, "secret", { expiresIn: '1h' });
                return res.status(200).send({
                    data: {
                        id: resultData[0].id,
                        username: resultData[0].username,
                        name: resultData[0].name,
                    },
                    token: token,
                });
            }
            else {
                res.status(400).send({
                    message: "Username or Password Invalid",
                });
            }
        });
    }
    SignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new users_model_1.UserModel(); // -> Refactor : Tambah Ini
            const saltRounds = 10;
            const salt = bcrypt_1.default.genSaltSync(saltRounds);
            const hash = bcrypt_1.default.hashSync(req.body.password, salt);
            const userRepository = orm_1.AppDataSource.getRepository(users_model_1.UserModel);
            // Refactor -> Dibuat Jadi seperti ini aja, better pake save dibanding create
            user.name = req.body.name;
            user.password = hash;
            user.username = req.body.username;
            const resultData = userRepository.save(user);
            // =======================
            return res.status(201).send({
                status: 201,
                data: resultData,
                message: "Succesfully Create Account",
            });
        });
    }
    Logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    EditProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    ProfileCheck(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.AuthController = AuthController;
