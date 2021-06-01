const express = require('express')
const { handleRequest } = require('../handleRequest')
const fly = require('../services/battle/fly')
const channel = require('../services/battle/spells/channel')
const spellManager = require('../services/battle/spells/spellManager')

const router = express.Router()

router.post('/fly', (req, res) => {
  handleRequest(req, res, fly)
})

router.post('/spell', (req, res) => {
  handleRequest(req, res, spellManager)
})

router.post('/channel', (req, res) => {
  handleRequest(req, res, channel)
})

module.exports = router
