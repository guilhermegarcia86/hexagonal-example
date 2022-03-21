import { v4 as uuidv4 } from 'uuid';

import { Item } from "../domain/Item";
import { Order } from "../domain/Order";
import { Payment } from "../domain/Payment";
import { NotFoundError } from "../error/NotFoundError";
import { Repository } from "../ports/repository/Repository";

import { Client } from "../ports/client/Client";

export class OrderService {

  private readonly orderRepository: Repository<Order>
  private readonly itemRepository: Repository<Item>
  private readonly paymentClient: Client<Payment>

  constructor(orderRepository: Repository<Order>, itemRepository: Repository<Item>, paymentClient: Client<Payment>) {
    this.orderRepository = orderRepository
    this.itemRepository = itemRepository
    this.paymentClient = paymentClient
  }

  public async createOrder(order: Order): Promise<Order> {

    order.id = uuidv4()
    order.createdAt = new Date()

    const itemResult = await Promise.all(order.items.map(async (item) => {
      return await this.itemRepository.getById(item.id)
    }))

    itemResult.forEach((item) => {
      if(!item){
        throw new NotFoundError('Item not found in database')
      }
    })

    order.items = itemResult

    const payment = await this.createPayment(order)

    const paymentResult = await this.paymentClient.send(payment)

    order.payments = [paymentResult]

    const orderSaved = await this.orderRepository.save(order)

    return orderSaved

  }

  public async findById(id: string): Promise<Order> {
    return await this.orderRepository.getById(id)
  }

  public async findAllOrders(): Promise<Order[]> {
    return await this.orderRepository.getAll()
  }

  private async createPayment(order: Order): Promise<Payment> {
    const payment = {
      order
    } as Payment

    return payment
  }

}
