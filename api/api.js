const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const api = express()
const matchmakingRouter = require('./routes/matchmakingRouter')
const battleRouter = require('./routes/battleRouter')
api.use(cors())
api.use(morgan('tiny'))
api.use(express.json())

api.use('/match/', matchmakingRouter)
api.use('/battle/', battleRouter)
module.exports = api
