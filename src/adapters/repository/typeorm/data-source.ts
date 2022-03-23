import { DataSource } from "typeorm";
import { ItemEntity } from "./entity/ItemEntity";
import { OrderEntity } from "./entity/OrderEntity";
import { PaymentEntity } from "./entity/PaymentEntity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "user",
  password: "user",
  database: "order",
  synchronize: true,
  logging: true,
  entities: [OrderEntity, ItemEntity, PaymentEntity],
  subscribers: [],
  migrations: [],
})