const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const api = express()
const router = require('./routes/router')

api.use(cors())
api.use(morgan('tiny'))
api.use(express.json())

api.use('/', router)

module.exports = api
