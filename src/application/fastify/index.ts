import { fastify } from 'fastify';
import { AppDataSource } from '../../adapters/repository/typeorm/data-source';
import OrderController from './controller/OrderController';

const server = fastify({
  logger: true
})


server.register(OrderController, { prefix: '/api'})

const start = async () => {
  try {
    AppDataSource.initialize().catch((error) => console.log('ERROR TYPEORM: ', error))
    await server.listen(process.env.PORT || 3001, '0.0.0.0')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()

