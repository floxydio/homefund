import { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import { graphqlHTTP } from "express-graphql"
// import { schemaGraphQL } from '../graphql/schema';
import { AuthController } from "../controllers/auth.controller"



export default function Routes(app: Express) {
   const authController = new AuthController()


   // Middleware
   app.use(bodyParser.urlencoded({ extended: true }))
   app.use(cors())
   // app.use("/graphql", graphqlHTTP({
   //    schema: schemaGraphQL,
   //    graphiql: true

   // }))
   //


   app.get("/", function (req, res) {
      return res.send("Not Found")
   })

   app.post("/api/sign-up", authController.SignUp)
   app.post("/api/sign-in", authController.SignIn)




   // app.get("/api/category", getCategory)
   // app.get("/api/virtualaccount", getVirtualAccount)


}
