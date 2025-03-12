import express from 'express'
import { apiRouter } from './routes/route.js'
import { connectdB } from './config/db.js'
import cookieParser from "cookie-parser";
const app = express()
const port = 3000


app.use(express.json())
app.use(cookieParser());
app.use('/route',apiRouter)
const database = connectdB
database()
app.get('/', (req, res) => {
  res.send('')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})