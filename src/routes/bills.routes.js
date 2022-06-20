const express = require('express')
const passport = require('passport')

const BillController = require('../controllers/bill.controller')
const { checkRoles } = require('./../middlewares/auth.handler')

const router = express.Router()
const controller = new BillController()

router.use(passport.authenticate('jwt', { session: false }))

router.get('/',
  async (req, res, next) => {
    try {
      const bills = await controller.find()
      res.json(bills)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/:id',
  async (req, res, next) => {
    try {
      const bill = await controller.findOne(req.params.id)
      res.status(200).json(bill)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  async (req, res, next) => {
    try {
      const newBill = await controller.create(req.body)
      res.status(201).json({
        message: 'Factura Creada',
        data: newBill
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
      const bill = controller.update(req.params.id, req.body)
      res.status(200).json({
        message: 'Factura Actualizada',
        data: bill
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
      const message = controller.delete(req.params.id)
      res.status(200).json({
        message
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
