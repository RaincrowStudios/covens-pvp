const { emitSocketEvent } = require('../../../socketManager')
const constants = require('../../../utils/constants')
const { getArena } = require('./arenaHandler')

module.exports = async ({ arenaId }) => {
  const arena = getArena(arenaId)
  arena.started = true
  arena.startedOn = Date.now() + constants.readyTime * 1000
  emitSocketEvent('arena.ready', arenaId)
  setTimeout(() => {
    emitSocketEvent('arena.start', arenaId)
  }, constants.readyTime * 1000)
}
