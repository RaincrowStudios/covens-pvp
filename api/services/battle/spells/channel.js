const { emitSocketEvent } = require('../../../../socketManager')
const constants = require('../../../../utils/constants')
const { getArena } = require('../../matchmaking/arenaHandler')
const {
  changeActionPoints,
} = require('../../matchmaking/utils/changeActionPoints')
const changeEnergy = require('./utils/changeEnergy')

module.exports = async ({ _id, arenaId, state }) => {
  const arena = getArena(arenaId)
  if (!arena) throw new Error('1001')
  const player = arena.entities[_id]
  if (!player) throw new Error('1002')

  if (state) {
    clearInterval(player.channelTimer)
    player.state = 'channel'
    emitSocketEvent('player.channel.start', JSON.stringify({ _id, arenaId }))
    delay(constants.channelRegenSpeed * 1000).then(() => {
      channelHelper(0, _id, arenaId)
    })
  } else {
    clearInterval(player.channelTimer)
    player.state = 'active'
    emitSocketEvent('player.channel.stop', JSON.stringify({ _id, arenaId }))
  }

  return 200
}

function channelHelper(startIndex, _id, arenaId) {
  const arena = getArena(arenaId)
  if (!arena) return
  const player = arena.entities[_id]
  if (!player) return

  player.channelTimer = setTimeout(() => {
    if (
      player.actionPoints > 0 &&
      player.state == 'channel' &&
      player.energy < 100
    ) {
      changeEnergy(_id, arenaId, constants.healthRegen[startIndex])
      changeActionPoints(_id, arenaId, -1)
      channelHelper(startIndex + 1, _id, arenaId)
    }
  }, constants.channelRegenSpeed * 1000)
}

const delay = (ms) => new Promise((_) => setTimeout(_, ms))
