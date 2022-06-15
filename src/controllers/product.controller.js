const boom = require('@hapi/boom')

const { models } = require('../db/libs/sequelize')

class ProductController {
  async create (data) {
    const newProduct = await models.Product.create(data)
    return newProduct
  }

  async find () {
    const products = await models.Product.findAll({
      include: [
        'category'
      ]
    })
    return products
  }

  async findOne (id) {
    const product = await models.Product.findByPk(id, {
      include: [
        'category'
      ]
    })
    if (!product) {
      throw boom.notFound('Producto no encontrado')
    }
    return product
  }

  async update (id, data) {
    const product = await this.findOne(id)
    const updatedProduct = await product.update(data)
    return updatedProduct
  }

  async delete (id) {
    const product = await this.findOne(id)
    await product.destroy(id)
    return {
      message: 'Producto eliminado'
    }
  }
}

module.exports = ProductController
