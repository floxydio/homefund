import express, { Express } from 'express';
import Routes from './routes/routes';
const port = 3500
const app: Express = express()

app.use(express.static("views"))

Routes(app)



app.listen(port, function () {
   console.log(`Running On -> ${port}`)
})
