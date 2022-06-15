const app = require('./src/app')
const config = require('./src/config/config')
const sequelize = require('./src/db/libs/sequelize')

const { port } = config

app.listen(port, async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    console.log(`Server is running on port ${port}`)
  } catch (error) {
    console.error('Error: ', error)
  }
})
