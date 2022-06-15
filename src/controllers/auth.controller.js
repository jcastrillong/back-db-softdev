const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const EmployeeController = require('./employees.controller')
const config = require('./../config/config')

const controller = new EmployeeController()

class AuthController {
  async login (id, password) {
    try {

    } catch (error) {
      throw boom.unauthorized()
    }
  }
}

module.exports = AuthController
