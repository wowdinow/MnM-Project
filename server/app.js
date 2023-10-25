if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  }

const express = require('express')
const router = require('./routers')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/', router)
app.use(errorHandler)

module.exports = app