const boom = require('@hapi/boom')

const { models } = require('../db/libs/sequelize')

class BillController {
  async create (data) {
    const newBill = await models.Bill.create(data)
    return newBill
  }

  async find () {
    const bills = await models.Bill.findAll({
      include: [
        {
          association: 'productsSold',
          include: [
            'product'
          ]
        },
        'client',
        'employee'
      ]
    })
    return bills
  }

  async findOne (id) {
    const bill = await models.Bill.findByPk(id, {
      include: [
        {
          association: 'productsSold',
          include: [
            'product'
          ]
        },
        'client',
        'employee'
      ]
    })
    if (!bill) {
      throw boom.notFound('Factura no encontrada')
    }
    return bill
  }

  async update (id, data) {
    const bill = await this.findOne(id)
    const updatedBill = await bill.update(data)
    return updatedBill
  }

  async delete (id) {
    const bill = await this.findOne(id)
    await bill.destroy(id)
    return {
      message: 'Factura eliminada'
    }
  }
}

module.exports = BillController
