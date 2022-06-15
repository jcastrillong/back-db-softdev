require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3001,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  },
  dbUrl: process.env.DB_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production'
}
