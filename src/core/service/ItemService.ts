import { Item } from "../domain/Item";
import { Repository } from "../ports/repository/Repository";

export class ItemService {

  private readonly itemRepository: Repository<Item>

  constructor(itemRepository: Repository<Item>) {
    this.itemRepository = itemRepository
  }

  public async createItem(item: Item): Promise<Item> {

    const itemSaved = await this.itemRepository.save(item)

    return itemSaved

  }

}
