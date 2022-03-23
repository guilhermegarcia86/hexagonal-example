import { Repository as RepositoryEntity } from "typeorm";
import { Item } from "../../../core/domain/Item";
import { Repository } from "../../../core/ports/repository/Repository";
import { AppDataSource } from "./data-source";
import { ItemEntity } from "./entity/ItemEntity";

export class TypeOrmItemRepository implements Repository<Item>{

  private readonly entityManager: RepositoryEntity<ItemEntity>

  constructor() {
    this.entityManager = AppDataSource.getRepository(ItemEntity)
  }

  async save(item: Item): Promise<Item> {

    const itemEntity = this.mapToItemEntity(item)

    const itemSaved = await this.entityManager.save(itemEntity)

    return this.mapToItemModel(itemSaved)
  }

  async getById(id: number): Promise<Item> {

    const itemEntity = await this.entityManager.findOneBy({ id })

    return this.mapToItemModel(itemEntity)
  }

  async getAll(): Promise<Item[]> {

    const allItems = await this.entityManager.find()

    return allItems.map((item) => this.mapToItemModel(item))
  }

  private mapToItemModel(itemEntity: ItemEntity): Item {

    const itemModel: Item = {
      id: itemEntity.id,
      name: itemEntity.name,
      price: itemEntity.price
    }
    return itemModel

  }

  private mapToItemEntity(item: Item): ItemEntity {

    const itemEntity: ItemEntity = new ItemEntity()
    itemEntity.id = item.id
    itemEntity.name = item.name
    itemEntity.price = item.price
    return itemEntity
  }

}