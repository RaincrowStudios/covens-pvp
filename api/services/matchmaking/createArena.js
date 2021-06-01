const { emitSocketEvent } = require('../../../socketManager')
const constants = require('../../../utils/constants')
const getUUID = require('../../../utils/getUUID')
const { getRandomInt } = require('../../../utils/helpers')
const { addArena } = require('./arenaHandler')
const createPlayer = require('./createPlayer')

module.exports = async ({ witchname, avatar = 0 }) => {
  const arenaId = getUUID()
  const player = await createPlayer(witchname, avatar, arenaId)
  const arena = {
    _id: arenaId,
    createdAt: Date.now(),
    started: false,
    startedOn: 0,
    positions: {},
    entities: {},
    host: player._id,
  }

  arena.positions[player._id] = getRandomInt(0, constants.islands * 3 - 1)
  arena.entities[player._id] = player
  player.position = arena.positions[player._id]

  addArena(arena)
  emitSocketEvent('arena.create', JSON.stringify(arena))
  return player
}
