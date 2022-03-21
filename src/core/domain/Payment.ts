import { Order } from "./Order"

export interface Payment {
  id: string
  order?: Order
  paidAt: Date
}