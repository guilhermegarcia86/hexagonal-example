import { Repository as RepositoryEntity } from "typeorm";
import { Item } from "../../../core/domain/Item";
import { Order } from "../../../core/domain/Order";
import { Payment } from "../../../core/domain/Payment";
import { Repository } from "../../../core/ports/repository/Repository";
import { AppDataSource } from "./data-source";
import { ItemEntity } from "./entity/ItemEntity";
import { OrderEntity } from "./entity/OrderEntity";
import { PaymentEntity } from "./entity/PaymentEntity";

export class TypeOrmOrderRepository implements Repository<Order>{

  private readonly entityManager: RepositoryEntity<OrderEntity>

  constructor() {
    this.entityManager = AppDataSource.getRepository(OrderEntity)
  }

  async save(order: Order): Promise<Order> {

    const orderEntity = this.mapToOrderEntity(order)

    const orderSaved = await this.entityManager.save(orderEntity)

    return this.mapToOrderModel(orderSaved)
  }

  async getById(id: number): Promise<Order> {

    const orderEntity = await this.entityManager.createQueryBuilder("order")
                                                .where("order.id = :id", { id })
                                                .leftJoinAndSelect("order.items", "item")
                                                .leftJoinAndSelect("order.payments", "payment")
                                                .getOne()

    return this.mapToOrderModel(orderEntity)
  }

  async getAll(): Promise<Order[]> {

    const allOrders = await this.entityManager.createQueryBuilder("order")
                                                .leftJoinAndSelect("order.items", "item")
                                                .leftJoinAndSelect("order.payments", "payment")
                                                .getMany()

    return allOrders.map((order) => this.mapToOrderModel(order))
  }

  private mapToOrderModel(orderEntity: OrderEntity): Order {

    const itemModel = orderEntity.items.map((item) => {
      const itemModel: Item = {
        id: item.id,
        name: item.name,
        price: item.price
      }
      return itemModel
    })

    const paymentModel = orderEntity.payments.map((payment) => {
      const paymentModel: Payment = {
        id: payment.id,
        paidAt: payment.paidAt
      }
      return paymentModel
    })

    const orderModel: Order = {
      id: orderEntity.id,
      amount: orderEntity.amount,
      items: itemModel,
      payments: paymentModel,
      createdAt: orderEntity.createdAt
    }

    return orderModel

  }

  private mapToOrderEntity(order: Order): OrderEntity {

    const itemList = order.items.map((item) => {
      const itemEntity: ItemEntity = new ItemEntity()
      itemEntity.id = item.id
      itemEntity.name = item.name
      itemEntity.price = item.price
      return itemEntity
    })


    const paymentList = order.payments.map((payment) => {
      const paymentEntity: PaymentEntity = new PaymentEntity()
      paymentEntity.id = payment.id
      paymentEntity.paidAt = payment.paidAt
      return paymentEntity
    })

    const orderEntity: OrderEntity = new OrderEntity()
    orderEntity.id = order.id
    orderEntity.amount = order.amount
    orderEntity.items = itemList
    orderEntity.payments = paymentList
    orderEntity.createdAt = order.createdAt

    return orderEntity
  }

}