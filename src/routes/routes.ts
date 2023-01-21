import { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import { graphqlHTTP } from "express-graphql"
import { schemaGraphQL } from '../graphql/schema';
import { getCategory } from '../controllers/category.controller';
import { getVirtualAccount } from '../controllers/virtual_account.controller';
// import authController from "../controllers/auth.controller"



export default function Routes(app: Express) {
   // Middleware
   app.use(bodyParser.urlencoded({ extended: true }))
   app.use(cors())
   app.use("/graphql", graphqlHTTP({
      schema: schemaGraphQL,
      graphiql: true

   }))
   //

   
   app.get("/", function (req, res) {
      return res.send("AAA")
   })

   app.get("/api/category", getCategory)
   app.get("/api/virtualaccount", getVirtualAccount)

   // app.post("/api/sign-in", authController)

}
