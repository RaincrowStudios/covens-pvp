const { emitSocketEvent } = require('../../../socketManager')
const constants = require('../../../utils/constants')
const { getArena } = require('./arenaHandler')
const createPlayer = require('./createPlayer')

module.exports = async ({ witchname, arenaId, avatar = 0 }) => {
  const player = await createPlayer(witchname, avatar, arenaId)
  const arena = getArena(arenaId)
  arena.entities[player._id] = player
  arena.positions[player._id] = getPosition(arena.positions)
  player.position = arena.positions[player._id]
  emitSocketEvent('arena.join', JSON.stringify(player))
  return arena
}

function getPosition(positions) {
  const usedPositions = Object.values(positions)
  const available = Array.from(Array(constants.islands * 3).keys()).filter(
    (i) => {
      if (!usedPositions.includes(i)) {
        return i
      }
    }
  )
  return available.sample()
}
