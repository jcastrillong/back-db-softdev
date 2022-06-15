const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const { models } = require('../db/libs/sequelize')

class EmployeeController {
  async create (data) {
    const passwordHash = await bcrypt.hash(data.password, 10)
    const newPersonal = await models.Employee.create({
      ...data,
      password: passwordHash
    })
    delete newPersonal.dataValues.password
    return newPersonal
  }

  async find () {
    const employees = await models.Employee.findAll({
      attributes: [
        'idEmployee',
        'firstName',
        'lastName',
        'phone',
        'role'
      ],
      include: [
        'bills'
      ]
    })
    return employees
  }

  async findOne (id) {
    const employee = await models.Employee.findByPk(id)
    if (!employee) {
      throw boom.notFound('Miembro no encontrado')
    }
    return employee
  }

  async update (id, data) {
    const member = await this.findOne(id)
    const updatedMember = await member.update(data)
    return updatedMember
  }

  async delete (id) {
    const member = await this.findOne(id)
    await member.destroy(id)
    return {
      message: 'Miembro eliminado'
    }
  }
}

module.exports = EmployeeController
