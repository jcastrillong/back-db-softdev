function errorHandler (error, req, res, next) {
  res.status(500).json({
    error: error.message,
    stack: error.stack
  })
}

module.exports = { errorHandler }
