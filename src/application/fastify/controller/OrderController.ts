import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginAsync
} from 'fastify';
import fp from 'fastify-plugin';

import { OrderService } from '../../../core/service/OrderService';
import { InMemoryItemRepository } from '../../../adapters/repository/inMemory/InMemoryItemRepository';
import { InMemoryPaymentClient } from '../../../adapters/client/InMemoryPaymentClient';
import { Repository } from '../../../core/ports/repository/Repository';
import { Client } from '../../../core/ports/client/Client';
import { Order } from '../../../core/domain/Order'
import { Item } from '../../../core/domain/Item'
import { Payment } from '../../../core/domain/Payment'
import { InMemoryOrderRepository } from '../../../adapters/repository/inMemory/InMemoryOrderRepository';
import { TypeOrmOrderRepository } from '../../../adapters/repository/typeorm/TypeOrmOrderRepository';
import { TypeOrmItemRepository } from '../../../adapters/repository/typeorm/TypeOrmItemRepository';

const orderInMemoryRepository: Repository<Order> = new InMemoryOrderRepository()
const itemInMemoryRepository: Repository<Item> = new InMemoryItemRepository()
const paymentInMemoryClient: Client<Payment> = new InMemoryPaymentClient()

const orderTypeOrmRepository: Repository<Order> = new TypeOrmOrderRepository()
const itemTypeOrmRepository: Repository<Item> = new TypeOrmItemRepository()

const orderService: OrderService = new OrderService(orderTypeOrmRepository, itemTypeOrmRepository, paymentInMemoryClient)

interface idParams {
  id: number
}

const OrderController: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {

  server.post<{ Body: Order }>('/', {}, async (request, reply) => {
    try {
      const order = await orderService.createOrder(request.body)
      return reply.code(201).send(order)
    } catch (error) {
      request.log.error(error)
      return reply.send(500)
    }
  })

  server.get<{ Params: idParams }>("/:id", {}, async (request, reply) => {

    const id = request.params.id
    const order = await orderService.findById(id)
    return reply.code(200).send(order)

  })

  server.get("/", {}, async (_, reply) => {

    const orders = await orderService.findAllOrders()
    return reply.code(200).send(orders)

  })


  server.get("/ping", {}, async (request, reply) => {
    return reply.code(200).send({ msg: "pong" })
  })
}

export default fp(OrderController)
