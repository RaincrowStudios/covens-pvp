const { emitSocketEvent } = require('../../../socketManager')
const { getArena, removeArena } = require('../matchmaking/arenaHandler')

module.exports = (arenaId) => {
  const arena = getArena(arenaId)
  if (arena.started && Object.values(arena.entities).length === 1) {
    const player = Object.values(arena.entities)[0]
    emitSocketEvent(
      'arena.win',
      JSON.stringify({ _id: player._id, arenaId, witchname: player.witchname })
    )
    removeArena(arenaId)
  }

  if (Object.keys(arena.entities).length === 0) {
    removeArena(arenaId)
    emitSocketEvent('arena.remove', arenaId)
  }
}
