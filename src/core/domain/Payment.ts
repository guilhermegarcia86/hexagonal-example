import { Order } from "./Order"

export interface Payment {
  id: string
  order: Order
  paid_at: Date
}