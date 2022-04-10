'use strict'

const dotenv = require('dotenv')
dotenv.config()
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const db = {}

const config = process.env

const sequelize = new Sequelize(config.DB_NAME_SEQUELIZE, config.DB_USER_SEQUELIZE, config.DB_PASS_SEQUELIZE, {
  host: config.DB_HOST_SEQUELIZE,
  port: config.DB_PORT_SEQUELIZE,
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  logging: false,
  dialectOptions: {},
  pool: {
    max: 50,
    min: 0,
    idle: 10000,
    acquire: 60000,
    evict: 60000
  }
})

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
