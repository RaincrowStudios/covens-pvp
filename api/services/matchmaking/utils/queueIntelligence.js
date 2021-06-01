const constants = require('../../../../utils/constants')
const { getArena } = require('../arenaHandler')

module.exports = (_id, arenaId) => {
  const arena = getArena(arenaId)
  if (arena) {
    const player = arena.entities[_id]
    if (player) {
      player.interval = setInterval(() => {
        if (arena.started && player.actionPoints < constants.baseActionPoints) {
          require('./changeActionPoints').changeActionPoints(_id, arenaId, 1)
        }
      }, constants.intelRegen * 1000)
    }
  }
}
