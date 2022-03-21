import { DataSource } from "typeorm";
import { ItemEntity } from "./entity/ItemEntity";
import { OrderEntity } from "./entity/OrderEntity";
import { PaymentEntity } from "./entity/PaymentEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "myuser",
  password: "myuser",
  database: "order",
  synchronize: true,
  logging: true,
  entities: [OrderEntity, ItemEntity, PaymentEntity],
  subscribers: [],
  migrations: [],
})