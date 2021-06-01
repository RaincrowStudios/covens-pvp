const { emitSocketEvent } = require('../../../../socketManager')
const constants = require('../../../../utils/constants')
const { clampValue } = require('../../../../utils/helpers')
const { getArena } = require('../arenaHandler')
const queueIntelligence = require('./queueIntelligence')

module.exports.changeActionPoints = (_id, arenaId, delta) => {
  const arena = getArena(arenaId)
  if (!arena) return
  const player = arena.entities[_id]
  if (!player) return

  player.actionPoints += delta

  player.actionPoints = clampValue(
    player.actionPoints,
    0,
    constants.baseActionPoints
  )

  if (delta < 0 && player.actionPoints < constants.baseActionPoints) {
    clearTimeout(player.timeout)
    clearInterval(player.interval)
    player.timeout = setTimeout(() => {
      queueIntelligence(_id, arenaId)
    }, constants.intelRegen * 1000)
  }
  const payload = {
    _id,
    arenaId,
    actionPoints: player.actionPoints,
  }
  emitSocketEvent('player.actionpoints', JSON.stringify(payload))
}
