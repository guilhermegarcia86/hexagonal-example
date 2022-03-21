import { v4 as uuidv4 } from 'uuid';

import { Payment } from "../../core/domain/Payment";
import { Client } from "../../core/ports/client/Client";
export class InMemoryPaymentClient implements Client<Payment> {

  send(payment: Payment): Promise<Payment> {
    payment.id = uuidv4()
    payment.paidAt = new Date()
    return Promise.resolve(payment)
  }

}