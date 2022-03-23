import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ItemEntity } from "./ItemEntity"
import { PaymentEntity } from "./PaymentEntity"

@Entity()
export class OrderEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'text'})
  amount: string

  @ManyToMany(() => ItemEntity)
  @JoinTable()
  items?: ItemEntity[]

  @OneToMany(type => PaymentEntity, payment => payment.order, { cascade: ['insert'] })
  payments?: PaymentEntity[]

  @Column({type: 'timestamp'})
  createdAt: Date

}