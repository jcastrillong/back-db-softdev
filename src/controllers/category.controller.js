const boom = require('@hapi/boom')

const { models } = require('../db/libs/sequelize')

class CategoryController {
  async create (data) {
    const newCategory = await models.Category.create(data)
    return newCategory
  }

  async find () {
    const categories = await models.Category.findAll({
      include: ['products']
    })
    return categories
  }

  async findOne (id) {
    const category = await models.Category.findByPk(id)
    if (!category) {
      throw boom.notFound('Categoría no encontrada')
    }
    return category
  }

  async update (id, data) {
    const category = await this.findOne(id)
    const updatedCategory = await category.update(data)
    return updatedCategory
  }

  async delete (id) {
    const category = await this.findOne(id)
    await category.destroy(id)
    return {
      message: 'Categoria eliminada'
    }
  }
}

module.exports = CategoryController
