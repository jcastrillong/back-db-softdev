const boom = require('@hapi/boom')

const { models } = require('../db/libs/sequelize')

class ClientController {
  async create (data) {
    const newClient = await models.Client.create(data)
    return newClient
  }

  async find () {
    const clients = await models.Client.findAll()
    return clients
  }

  async findOne (id) {
    const client = await models.Client.findByPk(id, {
      include: ['bills']
    })
    if (!client) {
      throw boom.notFound('Cliente no encontrado')
    }
    return client
  }

  async update (id, data) {
    const client = await this.findOne(id)
    const updatedClient = await client.update(data)
    return updatedClient
  }

  async delete (id) {
    const client = await this.findOne(id)
    await client.destroy(id)
    return {
      message: 'Cliente eliminado'
    }
  }
}

module.exports = ClientController
