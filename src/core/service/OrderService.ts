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

    for(const item of order.items){
      const itemResult = await this.itemRepository.getById(item.id)
      if(itemResult == undefined && itemResult == null){
        throw new NotFoundError('Item not found in database')
      }
    }

    // order.items.forEach(async (item)  => {
    //   const itemResult = await this.itemRepository.getById(item.id)
    //   if(itemResult == undefined && itemResult == null){
    //     throw new NotFoundError('Item not found in database')
    //   }
    // })

    const payment = await this.createPayment(order)

    const paymentResult = await this.paymentClient.send(payment)

    order.payment = [paymentResult]

    const orderSaved = await this.orderRepository.save(order)

    return orderSaved

  }

  private async createPayment(order: Order): Promise<Payment> {
    const payment = {
      order
    } as Payment

    return payment
  }

}
