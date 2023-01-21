import express, { Express } from 'express';
import Routes from './routes/routes';

const port = 3500
const app: Express = express()

Routes(app)



app.listen(port, function () {
   console.log(`Running On -> ${port}`)
})
