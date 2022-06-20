const { Strategy } = require('passport-local')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const EmployeeController = require('../../../controllers/employee.controller')
const controller = new EmployeeController()

const LocalStrategy = new Strategy(async (username, password, done) => {
  try {
    const employee = await controller.findOne(username)
    if (!employee) {
      return done(boom.unauthorized(), false)
    }
    const isMatch = await bcrypt.compare(password, employee.password)
    if (!isMatch) {
      done(boom.unauthorized(), false)
    }

    delete employee.dataValues.password
    return done(null, employee)
  } catch (error) {
    return done(error, false)
  }
}
)

module.exports = LocalStrategy
