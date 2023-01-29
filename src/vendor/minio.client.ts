import Minio from "minio"
import AWS from "aws-sdk"
import multer from "multer";
import multerS3 from "multer-s3"
import { S3Client } from '@aws-sdk/client-s3'

// const minioClient = new Minio.Client({
//    endPoint: "localhost",
//    port: 9000,
//    useSSL: true,
//    accessKey: 'dev12311!',
//    secretKey: 'dev12311!'
// })


export const s3Config = new AWS.S3({
   endpoint: "http://localhost:9000",
   accessKeyId: "dev12311!",
   secretAccessKey: "dev12311!",
});

export const s3 = new S3Client({
   endpoint: "http://127.0.0.1:9000",
   credentials: {
      accessKeyId: "dev12311!",
      secretAccessKey: "dev12311!"
   }
})

export const storageUpload = multer({
   storage: multerS3({
      s3: s3,
      bucket: "category",
      metadata: function (req, file, cb) {
         cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
         cb(null, Date.now().toString())
      }
   })
})
