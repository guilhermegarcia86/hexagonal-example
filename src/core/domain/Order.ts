import { Item } from "./Item"
import { Payment } from "./Payment"

export interface Order {
  id: string
  amount: string
  items: Item[]
  payments: Payment[]
  createdAt: Date
}