import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { ItemEntity } from "./ItemEntity"
import { PaymentEntity } from "./PaymentEntity"

@Entity()
export class OrderEntity {

  @PrimaryColumn({type: 'uuid'})
  id: string

  @Column({type: 'text'})
  amount: string

  @OneToMany(type => ItemEntity, item => item.order, { cascade: ['insert'] })
  items?: ItemEntity[]

  @OneToMany(type => PaymentEntity, payment => payment.order, { cascade: ['insert'] })
  payments?: PaymentEntity[]

  @Column({type: 'timestamp'})
  createdAt: Date

}