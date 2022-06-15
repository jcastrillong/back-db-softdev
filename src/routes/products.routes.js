const express = require('express')
const passport = require('passport')

const ProductController = require('../controllers/product.controller')
const { checkRoles } = require('./../middlewares/auth.handler')

const router = express.Router()
const controller = new ProductController()

router.get('/',
  async (req, res, next) => {
    try {
      const products = await controller.find()
      res.json(products)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await controller.findOne(id)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const body = req.body
      const product = await controller.create(body)
      res.status(201).json({
        message: 'Producto Creado',
        data: product
      })
    } catch (error) {
      next(error)
    }
  }
)

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const product = await controller.update(id, body)
      res.json({
        message: 'Producto Actualizado',
        data: product
      })
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const message = await controller.delete(id)
      res.json({
        message
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
