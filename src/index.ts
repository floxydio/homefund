import express, { Express, Request, Response } from 'express';
import Routes from './routes/routes';
import { AppDataSource } from './database/orm';

const port = 3500
const app: Express = express()
AppDataSource.initialize()
   .then(() => {
      console.log("Connected")
   })
   .catch((error) => console.log(error))


Routes(app)



app.listen(port, function () {
   console.log(`Running On -> ${port}`)
})
