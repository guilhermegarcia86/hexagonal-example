import { Order } from "./Order"

export interface Payment {
  id: number
  order?: Order
  paidAt: Date
}