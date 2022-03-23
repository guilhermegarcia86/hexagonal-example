import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { OrderEntity } from "./OrderEntity"

@Entity()
export class ItemEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'text'})
  name: string

  @Column({type: 'text'})
  price: string
}