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
import helmet from "helmet"
import { InvestasiController } from '../controllers/investasi.controller';
import { body } from 'express-validator';
import { FAQController } from '../controllers/faq.controller';
// ...rest of the initial code omitted for simplicity.
// import { storageUpload } from '../vendor/minio.client';
// import { storageUpload } from '../vendor/minio.client';
import { BusinessController } from '../controllers/business.controller';



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
   const investasiController = new InvestasiController()
   const businessController = new BusinessController()
   const faqControlller = new FAQController()

   // Middleware
   app.use(bodyParser.urlencoded({ extended: true }))
   app.use(cors())
   app.use(bodyParser.json())
   // app.use("/graphql", graphqlHTTP({
   //    schema: schemaGraphQL,
   //    graphiql: true

   // }))
   //
   app.use(helmet.xssFilter())



   app.get("/", function (req, res) {
      return res.send("Not Found")
   })

   app.get("/api/category", uploadCategory.single('icon'), categoryController.getCategory)
   app.get("/api/setting", settingController.getSetting)
   app.get("/api/virtual-account", virtualAccountController.getVirtualAccount)
   app.get("/api/news-slider", newsSliderController.getNewsSlider)
   app.get("/api/business", businessController.getBusiness)
   app.get("/api/faq", faqControlller.getFAQ)

   // app.post("/test-minio", storageUpload.single("upload"), (req, res) => {
   //    return res.send("ABC")
   // })

   app.post("/api/sign-up",
      body('name').notEmpty(),
      body('password').isLength({ min: 8 }),
      body('username').notEmpty(),
      authController.SignUp)
   app.post("/api/sign-up", body('name').notEmpty(), 
      body('password').isLength({ min: 8 }), 
      body('username').notEmpty(), authController.SignUp)
   app.post("/api/sign-in", authController.SignIn)
   app.post("/api/check-user", authController.TokenCheck)
   app.post("/api/investasi", 
      body("user_id").notEmpty(),
      body("price").isLength({min: 7}),
      body("item_id").notEmpty(),
      body("amount").notEmpty(), investasiController.postInvestasi)
 

}
