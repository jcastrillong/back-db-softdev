const express = require('express')
const passport = require('passport')

const ClientController = require('../controllers/client.controller')
const { checkRoles } = require('../middlewares/auth.handler')

const router = express.Router()
const controller = new ClientController()

router.use(passport.authenticate('jwt', { session: false }))

router.get('/',
  checkRoles('admin', 'estandar'),
  async (req, res, next) => {
    try {
      const clients = await controller.find()
      res.json(clients)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/:id',
  checkRoles('admin', 'estandar'),
  async (req, res, next) => {
    try {
      const client = await controller.findOne(req.params.id)
      res.json(client)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const newClient = await controller.create(req.body)
      res.status(201).json({
        message: 'Cliente Creado',
        data: newClient
      })
    } catch (error) {
      next(error)
    }
  }
)

router.put('/:id',
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const client = await controller.update(req.params.id, req.body)
      res.status(200).json({
        message: 'Cliente Actualizado',
        data: client
      })
    } catch (error) {
      next(error)
    }
  }
)
router.delete('/:id',
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const message = await controller.delete(req.params.id)
      res.status(200).json({
        message
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
