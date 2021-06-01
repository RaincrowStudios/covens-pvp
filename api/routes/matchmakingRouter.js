const express = require('express')
const { handleRequest } = require('../handleRequest')
const createArena = require('../services/matchmaking/createArena')
const allConstants = require('../services/allConstants')
const { getArenas } = require('../services/matchmaking/arenaHandler')
const joinArena = require('../services/matchmaking/joinArena')
const arenaReady = require('../services/matchmaking/arenaReady')
const playerLeave = require('../services/matchmaking/playerLeave')

const router = express.Router()

router.post('/get-constants', (req, res) => {
  handleRequest(req, res, allConstants)
})

router.post('/get-rooms', (req, res) => {
  handleRequest(req, res, getArenas)
})

router.post('/create', (req, res) => {
  handleRequest(req, res, createArena)
})

router.post('/join', (req, res) => {
  handleRequest(req, res, joinArena)
})

router.post('/ready', (req, res) => {
  handleRequest(req, res, arenaReady)
})

router.post('/leave', (req, res) => {
  handleRequest(req, res, playerLeave)
})

module.exports = router
