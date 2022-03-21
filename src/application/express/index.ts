import "reflect-metadata"
import express from 'express'
import { Request, Response } from 'express'
import OrderController from './controller/OrderController'
import { errorHandler } from './error/errorHandler'
import { AppDataSource } from "../../adapters/repository/typeorm/data-source"

const app = express()
const PORT = 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

AppDataSource.initialize().catch((error) => console.log('ERROR TYPEORM: ', error))

app.get('/health', (req: Request, res: Response) => {
  res.send('Application using Express!!!')
});

app.use('/api/v1/order', OrderController)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Express server is running at https://localhost:${PORT}`);
})
