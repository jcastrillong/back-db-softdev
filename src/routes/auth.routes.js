const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const config = require('../config/config')

const router = express.Router()

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req
      const payload = {
        sub: user.id,
        role: user.role
      }

      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '24h' })

      res.json({
        user,
        token
      })
    } catch (error) {
      next(error)
    }
  }
)

router.post('/logout',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      req.logout(() => {
        res.json({
          message: 'Logout successful'
        })
      })
    } catch (error) {
      next(error)
    }
  })

module.exports = router
