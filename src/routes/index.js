const express = require('express')

function useRouters (app) {
  const router = express.Router()

  app.use('/api', router)
}

module.exports = useRouters
