const { emitSocketEvent } = require('../../../socketManager')
const constants = require('../../../utils/constants')
const { getArena } = require('../matchmaking/arenaHandler')
const {
  changeActionPoints,
} = require('../matchmaking/utils/changeActionPoints')

module.exports = async ({ _id, arenaId, sameIsland, position }) => {
  const arena = getArena(arenaId)
  const player = arena.entities[_id]

  if (
    player.actionPoints >=
    (sameIsland ? constants.moveSameIsland : constants.moveOtherIsland)
  ) {
    if (Object.values(arena.positions).includes(position)) {
      throw new Error('2002')
    } else {
      player.position = position
      arena.positions[_id] = position
      emitSocketEvent(
        'arena.move',
        JSON.stringify({
          _id,
          arenaId,
          position,
        })
      )
      changeActionPoints(
        _id,
        arenaId,
        sameIsland ? -constants.moveSameIsland : -constants.moveOtherIsland
      )
      return 200
    }
  } else {
    throw new Error('2001')
  }
}
