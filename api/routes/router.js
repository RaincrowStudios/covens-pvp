const express = require('express')
const { handleRequest } = require('../handleRequest')
const { create, join } = require('../services/roomService')
const spellManager = require('../services/spellManager')
const updateConstants = require('../services/updateConstants')
const router = express.Router()

router.post('/create', (req, res) => {
  handleRequest(req, res, create)
})

router.post('/join', (req, res) => {
  handleRequest(req, res, join)
})

router.post('/constants', (req, res) => {
  handleRequest(req, res, updateConstants)
})

router.post('/spell', (req, res) => {
  handleRequest(req, res, spellManager)
})

router.post('/heal', (req, res) => {
  handleRequest(req, res, spellManager.heal)
})

module.exports = router
