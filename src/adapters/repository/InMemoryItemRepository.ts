import { Item } from "../../core/domain/Item";
import { Repository } from "../../core/ports/repository/Repository";

export class InMemoryItemRepository implements Repository<Item> {

  private itemList: Item[] = []

  save(item: Item): Promise<Item> {
    this.itemList.push(item)
    return Promise.resolve(item)
  }

  getById(id: string): Promise<Item>  {
    const item = this.itemList.find((item) => item.id === id)
    return Promise.resolve(item)
  }

  getAll(): Promise<Item[]> {
    return Promise.resolve(this.itemList)
  }
  
}