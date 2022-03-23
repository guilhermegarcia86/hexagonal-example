import express from 'express';
import { Response, Request } from 'express';
import { InMemoryItemRepository } from '../../../adapters/repository/inMemory/InMemoryItemRepository';
import { Repository } from '../../../core/ports/repository/Repository';
import { Item } from '../../../core/domain/Item'
import { TypeOrmItemRepository } from '../../../adapters/repository/typeorm/TypeOrmItemRepository';
import { ItemService } from '../../../core/service/ItemService';

const router = express.Router()

const itemTypeOrmRepository: Repository<Item> = new TypeOrmItemRepository()

const itemService: ItemService = new ItemService(itemTypeOrmRepository)

router.post('/', async (req: Request<{}, {}, Item>, res: Response<Item>) => {
  const item = await itemService.createItem(req.body)
  res.json(item)
})

export default router
