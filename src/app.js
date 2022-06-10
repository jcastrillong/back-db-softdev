const express = require('express')
const cors = require('cors')

const useRouters = require('./routes/index')

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API'
  })
})

useRouters(app)

module.exports = app
