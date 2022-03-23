import { Payment } from "../../core/domain/Payment";
import { Client } from "../../core/ports/client/Client";
export class InMemoryPaymentClient implements Client<Payment> {

  send(payment: Payment): Promise<Payment> {
    payment.paidAt = new Date()
    return Promise.resolve(payment)
  }

}