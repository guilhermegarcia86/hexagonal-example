import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { OrderEntity } from "./OrderEntity"

@Entity()
export class PaymentEntity {

  @PrimaryColumn({type: 'uuid'})
  id: string

  @ManyToOne(type => OrderEntity, order => order.payments, { cascade: ['insert'], eager: true})
  order?: OrderEntity
  
  @Column({type: 'timestamp'})
  paidAt: Date
}