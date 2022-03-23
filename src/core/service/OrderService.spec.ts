import { InMemoryPaymentClient } from "../../adapters/client/InMemoryPaymentClient"
import { InMemoryItemRepository } from "../../adapters/repository/inMemory/InMemoryItemRepository"
import { InMemoryOrderRepository } from "../../adapters/repository/inMemory/InMemoryOrderRepository"
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

  beforeEach(() => {
    orderRepository = new InMemoryOrderRepository()
    itemRepository = new InMemoryItemRepository()
    paymentClient = new InMemoryPaymentClient()
  
    orderService = new OrderService(orderRepository, itemRepository, paymentClient)
  })

  it('Should create a Order', async () => {

    const item: Item = {
      id: 1,
      name: 'Produto 1',
      price: '20.0'
    }

    await itemRepository.save(item)

    const order = {
      id: 1,
      amount: '100.0',
      items: [item],
      createdAt: new Date()
    } as Order

    const orderResult = await orderService.createOrder(order)

    expect(orderResult.id).toEqual(order.id)

  })

  it('Should validate a Order', async () => {

    const item: Item = {
      id: 2,
      name: 'Produto 2',
      price: '20.0'
    }

    const order = {
      id: 2,
      amount: '100.0',
      items: [item],
      createdAt: new Date()
    } as Order

    await expect(async () => {
      await orderService.createOrder(order)
    }).rejects.toThrow(NotFoundError)

  })

  it('Should find all the orders', async () => {

    const item: Item = {
      id: 1,
      name: 'Assistencia',
      price: '20.0'
    }

    await itemRepository.save(item)

    const order = {
      id: 2,
      amount: '100.0',
      items: [item],
      createdAt: new Date()
    } as Order

    await orderService.createOrder(order)

    const orders = await orderService.findAllOrders()

    expect(orders.length).toEqual(1)
    expect(orders).toEqual(expect.arrayContaining([expect.objectContaining({id: 2})]))


  })

  it('Should find the order by id', async () => {

    const item: Item = {
      id: 1,
      name: 'Assistencia',
      price: '20.0'
    }

    await itemRepository.save(item)

    const order = {
      id: 2,
      amount: '100.0',
      items: [item],
      createdAt: new Date()
    } as Order

    await orderService.createOrder(order)

    const orderResult = await orderService.findById(2)

    expect(orderResult.id).toEqual(order.id)
  })
})