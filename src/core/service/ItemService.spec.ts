import { InMemoryItemRepository } from "../../adapters/repository/inMemory/InMemoryItemRepository"
import { Item } from "../domain/Item"
import { Repository } from "../ports/repository/Repository"
import { ItemService } from "./ItemService"

describe('OrderService', () => {
  
  let itemRepository: Repository<Item>

  let itemService: ItemService

  beforeEach(() => {
    itemRepository = new InMemoryItemRepository()
  
    itemService = new ItemService(itemRepository)
  })

  it('Should create a Item', async () => {

    const item = {
      name: 'Assistencia',
      price: '20.0'
    } as Item

    const itemSaved = await itemService.createItem(item)

    expect(itemSaved.id).toEqual(1)

  })

  it('Should find all Items', async () => {

    const item = {
      name: 'Assistencia',
      price: '20.0'
    } as Item

    await itemService.createItem(item)

    const items = await itemRepository.getAll()

    expect(items.length).toEqual(1)
    expect(items).toEqual(expect.arrayContaining([expect.objectContaining({id: 1})]))

  })
})