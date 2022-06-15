const express = require('express')
const passport = require('passport')

const EmployeeController = require('../controllers/employee.controller')
const { checkRoles } = require('../middlewares/auth.handler')

const router = express.Router()
const controller = new EmployeeController()

router.use(passport.authenticate('jwt', { session: false }))
router.use(checkRoles('admin'))

router.get('/', async (req, res, next) => {
  try {
    const personal = await controller.find()
    res.json(personal)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const personal = await controller.findOne(id)
    delete personal.password
    res.json(personal)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body
    const personal = await controller.create(body)
    delete personal.password
    res.status(201).json({
      message: 'Empleado Creado',
      data: personal
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const personal = await controller.update(id, body)
    res.json({
      message: 'Empleado Actualizado',
      data: personal
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const message = await controller.delete(id)
    res.json({
      message
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
