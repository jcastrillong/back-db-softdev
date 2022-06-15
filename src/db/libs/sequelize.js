const { Sequelize } = require('sequelize')

const setupModels = require('../models')
const config = require('../../config/config')

const sequelize = new Sequelize(config.dbUrl)

setupModels(sequelize)

module.exports = sequelize
