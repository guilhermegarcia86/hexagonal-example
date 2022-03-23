import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { OrderEntity } from "./OrderEntity"

@Entity()
export class PaymentEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => OrderEntity, order => order.payments, { cascade: ['insert']})
  order?: OrderEntity
  
  @Column({type: 'timestamp'})
  paidAt: Date
}