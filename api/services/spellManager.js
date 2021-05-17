const { getRoom } = require('./roomManager')
const getDamage = require('../../utils/getDamage')
const { getConstants } = require('../../utils/getConstants')
const {
  emitSpellCast,
  emitEnergyChange,
  emitDebuffChange,
  emitActionPointsUpdate,
  emitHealStatus,
  emitHealInfo,
} = require('../../socketManager')

module.exports = async ({ roomId, player, spellType }) => {
  console.log(roomId)
  const room = getRoom(roomId)
  const constants = await getConstants()
  const payload = {}
  if (room) {
    payload.success = true
    let otherPlayer = Object.values(room.players).find((x) => x._id !== player)
    let selfPlayer = room.players[player]
    let dmg = 0

    if (spellType === 'hex') {
      dmg = getDamage(1, 3)
      selfPlayer.actionPoints--
    } else if (spellType === 'atk1') {
      dmg = getDamage(2, 6)
      selfPlayer.actionPoints -= 2
    } else if (spellType === 'atk2') {
      selfPlayer.actionPoints -= 3
      dmg = getDamage(6, 6)
    }

    if (selfPlayer.actionPoints < 0) {
      payload.success = false
      payload.msg = 'Not enough action points to cast the spell'
      selfPlayer.actionPoints = 0
      return payload
    }

    emitActionPointsUpdate({
      _id: player,
      actionPoints: selfPlayer.actionPoints,
    })
    let crit = false
    if (
      Math.random() <=
      otherPlayer.debuffs.length * constants['critPerHex'] * 0.01 +
        constants['critHit'] * 0.01
    ) {
      crit = true
      dmg *= 3
    }

    otherPlayer.energy -= dmg

    if (
      spellType === 'hex' &&
      otherPlayer.debuffs.length < constants['hexStackCount']
    ) {
      otherPlayer.debuffs.push('hex')
      emitDebuffChange({
        _id: otherPlayer._id,
        debuffs: otherPlayer.debuffs,
      })
      setTimeout(() => {
        if (otherPlayer && otherPlayer.debuffs.length > 0) {
          otherPlayer.debuffs.pop()
          emitDebuffChange({
            _id: otherPlayer._id,
            debuffs: otherPlayer.debuffs,
          })
        }
      }, 10 * 1000)
    }

    const spell = {
      caster: player,
      target: otherPlayer._id,
      spell: spellType,
      debuffs: otherPlayer.debuffs,
      dmg,
      msg: `${room.players[player].name} cast ${spellType} on ${otherPlayer.name}. They lose -${dmg} Energy.`,
      crit,
    }
    emitSpellCast(spell)
    emitEnergyChange({
      _id: otherPlayer._id,
      energy: otherPlayer.energy,
      roomId,
    })

    return {
      success: true,
      crit,
      msg: `${spellType} successfull, ${otherPlayer.name} lose -${dmg} Energy.`,
    }
  } else {
    payload.success = false
    payload.msg = 'Invalid room id'
  }
  return payload
}

const healEn = [3, 5, 9, 15, 25, 35, 35, 35, 35]

module.exports.heal = async ({ roomId, player, active }) => {
  const room = getRoom(roomId)
  let selfPlayer = room.players[player]
  selfPlayer.heal = active
  if (active) {
    healHelper(0, selfPlayer, roomId)
  } else {
    if (selfPlayer.healTimeout) clearTimeout(selfPlayer.healTimeout)
  }
  emitHealStatus({ _id: selfPlayer._id, active })
}

function healHelper(start, selfPlayer, roomId) {
  if (selfPlayer.actionPoints > 0 && selfPlayer.heal && selfPlayer.energy < 100)
    selfPlayer.healTimeout = setTimeout(() => {
      selfPlayer.energy += healEn[start]
      if (selfPlayer.energy >= 100) selfPlayer.energy = 100
      selfPlayer.actionPoints--
      emitEnergyChange({
        _id: selfPlayer._id,
        energy: selfPlayer.energy,
        roomId,
      })
      emitActionPointsUpdate({
        _id: selfPlayer._id,
        actionPoints: selfPlayer.actionPoints,
      })
      emitHealInfo({ _id: selfPlayer._id, heal: healEn[start] })

      healHelper(start + 1, selfPlayer, roomId)
    }, 2 * 1000)
}
