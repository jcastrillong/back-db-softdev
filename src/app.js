const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const { checkApiKey } = require('./middlewares/auth.handler')
const useRouters = require('./routes/index')
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
  ormErrorHandler,
  notFoundHandler
} = require('./middlewares/error.handler')

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

require('./utils/auth')

// Routes
app.get('/', checkApiKey, (req, res) => {
  res.send('Hello World')
})

useRouters(app)

// Error handlers
app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app
