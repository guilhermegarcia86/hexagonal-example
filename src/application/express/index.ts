import "reflect-metadata"
import express from 'express'
import { Request, Response } from 'express'
import OrderController from './controller/OrderController'
import { errorHandler } from './error/errorHandler'
import { AppDataSource } from "../../adapters/repository/typeorm/data-source"
import ItemController from "./controller/ItemController"
import { connectDB, sequelize } from "../../adapters/repository/sequelize/connect"
import UserController from "./controller/UserController"

const app = express()
const PORT = 3000;


(async () => {

  await connectDB(sequelize)

  app.use(express.json())
  app.use(express.urlencoded({ extended: true}))

  // AppDataSource.initialize().catch((error) => console.log('ERROR TYPEORM: ', error))

  app.get('/health', (req: Request, res: Response) => {
    res.send('Application using Express!!!')
  });

  app.use('/api/user', UserController)
  app.use('/api/v1/order', OrderController)
  app.use('/api/v1/item', ItemController)

  app.use(errorHandler)

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Express server is running at https://localhost:${PORT}`);
  })

})()
