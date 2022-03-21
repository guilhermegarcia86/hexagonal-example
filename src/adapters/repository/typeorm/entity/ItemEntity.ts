import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { OrderEntity } from "./OrderEntity"

@Entity()
export class ItemEntity {

  @PrimaryColumn({type: 'uuid'})
  id: string

  @Column({type: 'text'})
  name: string

  @ManyToOne(type => OrderEntity, order => order.payments, { eager: true})
  order?: OrderEntity

  @Column({type: 'text'})
  price: string
}