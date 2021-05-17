const { emitGameStarted } = require('../../socketManager')
const { getConstants } = require('../../utils/getConstants')
const getUUID = require('../../utils/getUUID')
const { addRoom, addPlayer } = require('./roomManager')

module.exports.create = async ({ name, lightSchool, avatar }) => {
  const constants = await getConstants()
  const player = await getPlayer(name, lightSchool, avatar, constants)
  const room = {
    _id: getUUID().split('-')[0],
    host: player._id,
    players: {},
    createdOn: Date.now(),
    started: false,
  }

  room.players[player._id] = player

  addRoom(room)
  return { room, playerId: player._id, constants }
}

module.exports.join = async ({ name, lightSchool, roomId, avatar }) => {
  const constants = await getConstants()
  const player = await getPlayer(name, lightSchool, avatar, constants)
  const room = addPlayer(player, roomId)
  console.log(room)
  if (!room) throw new Error('Room not found')
  emitGameStarted(room)
  return { room, playerId: player._id, constants }
}

async function getPlayer(name, lightSchool, avatar, constants) {
  return {
    _id: getUUID(),
    energy: constants.totalEnergy,
    actionPoints: constants.baseActionPoints,
    debuffs: [],
    buffs: [],
    avatar,
    name,
    heal: false,
    lightSchool,
  }
}
