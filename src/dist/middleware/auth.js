"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticatetoken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({
            message: 'Token Not Found',
        });
    }
    jsonwebtoken_1.default.verify(token, 'secret', (err, result) => {
        if (err) {
            return res.status(401).json({
                message: 'User Unauthorized',
            });
        }
    });
    next();
}
exports.default = authenticatetoken;
