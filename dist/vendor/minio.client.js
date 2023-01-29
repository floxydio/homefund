"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageUpload = exports.s3Config = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const client_s3_1 = require("@aws-sdk/client-s3");
// const minioClient = new Minio.Client({
//    endPoint: "localhost",
//    port: 9000,
//    useSSL: true,
//    accessKey: 'dev12311!',
//    secretKey: 'dev12311!'
// })
exports.s3Config = new aws_sdk_1.default.S3({
    endpoint: "http://localhost:9000",
    accessKeyId: "dev12311!",
    secretAccessKey: "dev12311!",
});
const s3 = new client_s3_1.S3Client({
    endpoint: "http://localhost:9000",
    credentials: {
        accessKeyId: "dev12311!",
        secretAccessKey: "dev12311!"
    }
});
exports.storageUpload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: "category",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
});
