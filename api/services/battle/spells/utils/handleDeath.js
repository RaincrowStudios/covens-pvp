const { emitSocketEvent } = require('../../../../../socketManager')
const { getArena } = require('../../../matchmaking/arenaHandler')
const handleWinner = require('../../handleWinner')

module.exports = (_id, arenaId) => {
  const arena = getArena(arenaId)
  const player = arena.entities[_id]
  if (player && player.energy <= 0) {
    delete arena.entities[_id]
    emitSocketEvent('entity.death', JSON.stringify({ _id, arenaId }))
    handleWinner(arenaId)
  }
}
