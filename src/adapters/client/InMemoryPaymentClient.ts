import { v4 as uuidv4 } from 'uuid';

import { Payment } from "../../core/domain/Payment";
import { Client } from "../../core/ports/client/Client";
import { AcquirerRequest } from "../dto/AcquirerDTO";

export class InMemoryPaymentClient implements Client<Payment> {

  send(payment: Payment): Promise<Payment> {
    payment.id = uuidv4()
    return Promise.resolve(payment)
  }

  private static toAcquirerRequest(payment: Payment): AcquirerRequest {

    const request: AcquirerRequest = {
      id: payment.order.id,
      description: 'Compra com cartão',
      amount: payment.order.amount
    }

    return request
  }

}