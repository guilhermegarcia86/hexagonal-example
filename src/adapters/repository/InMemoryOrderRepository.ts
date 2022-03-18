import { Order } from "../../core/domain/Order";
import { Repository } from "../../core/ports/repository/Repository";

export class InMemoryOrderRepository implements Repository<Order> {

  private orderList: Order[] = []

  save(order: Order): Promise<Order> {
    this.orderList.push(order)
    return Promise.resolve(order)
  }

  getById(id: string): Promise<Order>  {
    const order = this.orderList.find((order) => order.id === id)
    return Promise.resolve(order)
  }

  getAll(): Promise<Order[]> {
    return Promise.resolve(this.orderList)
  }
  
}