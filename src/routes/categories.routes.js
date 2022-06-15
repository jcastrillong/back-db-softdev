const express = require('express')
const passport = require('passport')

const CategoryController = require('../controllers/category.controller')

const router = express.Router()
const controller = new CategoryController()

router.use(passport.authenticate('jwt', { session: false }))

router.get('/', async (req, res, next) => {
  try {
    const categories = await controller.find()
    res.json(categories)
  } catch (error) {
    next(error)
  }
}
)

router.post('/', async (req, res, next) => {
  try {
    const newCategory = await controller.create(req.body)
    res.status(201).json({
      message: 'Categoría Creada',
      data: newCategory
    })
  } catch (error) {
    next(error)
  }
}
)

router.put('/:id', async (req, res, next) => {
  try {
    const category = await controller.update(req.params.id, req.body)
    res.status(200).json({
      message: 'Categoría Actualizada',
      data: category
    })
  } catch (error) {
    next(error)
  }
}
)

router.delete('/:id', async (req, res, next) => {
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
