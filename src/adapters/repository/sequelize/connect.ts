import { Sequelize } from 'sequelize'

import { sequelize } from './config'

function connectDB (sequelize: Sequelize) {

  console.log('Testing connection')

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully')
  }).catch((err: any) => {
    console.error(`Problem connecting to database: ${err}`)
    console.error('Exiting...')
    process.exit(1)
  })
}

export {
  sequelize,
  connectDB
}