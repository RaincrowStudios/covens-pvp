const { emitActionPointsUpdate } = require('../../socketManager')
const { getConstants } = require('../../utils/getConstants')

const rooms = {}

module.exports.addRoom = (room) => {
  rooms[room._id] = room
}

module.exports.getRoom = (id) => rooms[id]

module.exports.addPlayer = (player, roomId) => {
  const room = this.getRoom(roomId)

  if (room) {
    room.started = true
    room.players[player._id] = player
    updateActionPoints(roomId)
    return room
  } else {
    return null
  }
}

async function updateActionPoints(roomId) {
  const constants = await getConstants()
  const room = rooms[roomId]
  if (room && room.started) {
    Object.values(room.players).forEach((player) => {
      if (player.actionPoints < constants['baseActionPoints'] && !player.heal) {
        player.actionPoints++
        emitActionPointsUpdate({
          _id: player._id,
          actionPoints: player.actionPoints,
        })
      }
    })

    setTimeout(() => {
      updateActionPoints(roomId)
    }, constants['intelRegen'] * 1000)
  }
}
