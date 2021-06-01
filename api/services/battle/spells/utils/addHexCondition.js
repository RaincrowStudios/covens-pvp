const { emitSocketEvent } = require('../../../../../socketManager')
const constants = require('../../../../../utils/constants')
const getUUID = require('../../../../../utils/getUUID')

module.exports = (player) => {
  let hexCount = 0
  Object.values(player.buffs).map((x) => {
    if (x.type === 'hex') hexCount++
  })

  console.log('total hex count ' + hexCount)

  if (hexCount < constants.hexStackCount) {
    const uid = getUUID()
    const newBuff = {
      _id: uid,
      buff: false,
      type: 'hex',
      startedOn: Date.now(),
    }
    player.buffs[uid] = newBuff
    emitSocketEvent(
      'entity.condition.hex.add',
      JSON.stringify({
        _id: player._id,
        arenaId: player.arenaId,
        buff: newBuff,
      })
    )
    setTimeout(() => {
      if (player && player.buffs[uid]) {
        delete player.buffs[uid]
        emitSocketEvent(
          'entity.condition.hex.remove',
          JSON.stringify({
            _id: player._id,
            arenaId: player.arenaId,
            buff: uid,
          })
        )
      }
    }, constants.hexTime * 1000)
  }
}
