const { ValidationError } = require('sequelize')

function logErrors (error, req, res, next) {
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message
    })
  }
  next(error)
}

function boomErrorHandler (error, req, res, next) {
  if (error.isBoom) {
    const { output } = error
    return res.status(output.statusCode).json(output.payload)
  }
  next(error)
}

function ormErrorHandler (error, req, res, next) {
  if (error instanceof ValidationError) {
    return res.status(409).json({
      statusCode: 409,
      message: error.name,
      errors: error.errors
    })
  }
  next(error)
}

function notFoundHandler (req, res, next) {
  res.status(404).json({
    error: 'Not found',
    path: req.path,
    method: req.method
  })
  next()
}

function errorHandler (error, req, res, next) {
  res.status(500).json({
    error: error.message,
    stack: error.stack
  })
}

module.exports = {
  errorHandler,
  notFoundHandler,
  boomErrorHandler,
  logErrors,
  ormErrorHandler
}
