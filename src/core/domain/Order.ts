import { Item } from "./Item"
import { Payment } from "./Payment"

export interface Order {
  id: string
  amount: string
  items: Item[]
  payment: Payment[]
  created_at: Date
}