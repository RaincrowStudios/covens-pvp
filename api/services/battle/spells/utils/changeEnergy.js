const { emitSocketEvent } = require('../../../../../socketManager')
const constants = require('../../../../../utils/constants')
const { clampValue } = require('../../../../../utils/helpers')
const { getArena } = require('../../../matchmaking/arenaHandler')
const handleDeath = require('./handleDeath')

module.exports = (_id, arenaId, delta) => {
  const arena = getArena(arenaId)
  const player = arena.entities[_id]
  if (player) {
    player.energy += delta
    player.energy = clampValue(player.energy, 0, constants.totalEnergy)
    emitSocketEvent(
      'entity.energy',
      JSON.stringify({
        _id,
        arenaId,
        energy: player.energy,
      })
    )
    handleDeath(_id, arenaId)
  }
}
