import { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import { graphqlHTTP } from "express-graphql"
// import { schemaGraphQL } from '../graphql/schema';
import { AuthController } from "../controllers/auth.controller"
import { CategoryController } from '../controllers/category.controller';
import { SettingController } from '../controllers/setting.controller';
import { VirtualAccountController } from '../controllers/virtual_account.controller';
import { NewsSliderController } from '../controllers/news_slider.controller';
import multer, { Multer } from 'multer';
// import { storageUpload } from '../vendor/minio.client';
import helmet from "helmet"



export default function Routes(app: Express) {

   const categoryStorage = multer.diskStorage({
      destination: (req, file, cb) => {
         cb(null, 'storage/category')
      },
      filename: (req, file, cb) => {
         cb(null, file.fieldname + Date.now())
      }
   })

   const uploadCategory = multer({
      storage: categoryStorage
   })

   const authController = new AuthController()
   const categoryController = new CategoryController()
   const settingController = new SettingController()
   const virtualAccountController = new VirtualAccountController()
   const newsSliderController = new NewsSliderController()


   // Middleware
   app.use(bodyParser.urlencoded({ extended: true }))
   app.use(cors())
   app.use(bodyParser.json())

   // CSRF
   app.use(helmet.xssFilter())

   app.get("/", function (req, res) {
      return res.send("Not Found")
   })

   app.get("/api/category", uploadCategory.single('icon'), categoryController.getCategory)
   app.get("/api/setting", settingController.getSetting)
   app.get("/api/virtual-account", virtualAccountController.getVirtualAccount)
   app.get("/api/news-slider", newsSliderController.getNewsSlider)

   // app.post("/test-minio", storageUpload.single("upload"), (req, res) => {
   //    return res.send("ABC")
   // })

   app.post("/api/sign-up", authController.SignUp)
   app.post("/api/sign-in", authController.SignIn)



}
