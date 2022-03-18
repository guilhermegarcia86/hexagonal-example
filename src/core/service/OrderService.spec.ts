import { v4 as uuidv4 } from 'uuid';

import { InMemoryPaymentClient } from "../../adapters/client/InMemoryPaymentClient"
import { InMemoryItemRepository } from "../../adapters/repository/InMemoryItemRepository"
import { InMemoryOrderRepository } from "../../adapters/repository/InMemoryOrderRepository"
import { Item } from "../domain/Item"
import { Order } from "../domain/Order"
import { Payment } from "../domain/Payment"
import { NotFoundError } from '../error/NotFoundError';
import { Client } from "../ports/client/Client"
import { Repository } from "../ports/repository/Repository"
import { OrderService } from "./OrderService"

describe('OrderService', () => {
  
  let orderRepository: Repository<Order>
  let itemRepository: Repository<Item>
  let paymentClient: Client<Payment>

  let orderService: OrderService

  beforeAll(() => {
    orderRepository = new InMemoryOrderRepository()
    itemRepository = new InMemoryItemRepository()
    paymentClient = new InMemoryPaymentClient()
  
    orderService = new OrderService(orderRepository, itemRepository, paymentClient)
  })

  it('Should create a Order', async () => {

    const item: Item = {
      id: '1',
      name: 'Assistencia',
      price: '20.0'
    }

    await itemRepository.save(item)

    const order = {
      id: uuidv4(),
      amount: '100.0',
      items: [item],
      created_at: new Date()
    } as Order

    const orderResult = await orderService.createOrder(order)

    expect(orderResult.id).toEqual(order.id)

  })

  it('Should validate a Order', async () => {

    const item: Item = {
      id: '2',
      name: 'Assistencia',
      price: '20.0'
    }

    const order = {
      id: uuidv4(),
      amount: '100.0',
      items: [item],
      created_at: new Date()
    } as Order

    await expect(async () => {
      await orderService.createOrder(order)
    }).rejects.toThrow(NotFoundError)

  })
})