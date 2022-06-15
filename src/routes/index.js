const express = require('express')

const billRoutes = require('./bills.routes')
const employeeRoutes = require('./employees.routes')
const productsRoutes = require('./products.routes')
const categoriesRoutes = require('./categories.routes')
const clientsRoutes = require('./clients.routes')
const authRoutes = require('./auth.routes')

const router = express.Router()

function useRouters (app) {
  app.use('/api', router)

  router.use('/auth', authRoutes)
  router.use('/bills', billRoutes)
  router.use('/employees', employeeRoutes)
  router.use('/products', productsRoutes)
  router.use('/categories', categoriesRoutes)
  router.use('/clients', clientsRoutes)
}

module.exports = useRouters
