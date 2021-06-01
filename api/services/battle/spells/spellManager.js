const { emitSocketEvent } = require('../../../../socketManager')
const constants = require('../../../../utils/constants')
const { getArena } = require('../../matchmaking/arenaHandler')
const {
  changeActionPoints,
} = require('../../matchmaking/utils/changeActionPoints')
const addHexCondition = require('./utils/addHexCondition')
const changeEnergy = require('./utils/changeEnergy')
const getSpellDamage = require('./utils/getSpellDamage')

module.exports = async ({ _id, arenaId, spellName, targetId }) => {
  const arena = getArena(arenaId)
  if (!arena) throw new Error('1001')
  const player = arena.entities[_id]
  const target = arena.entities[targetId]

  if (!player && !target) throw new Error('1002')

  const spell = constants.spell[spellName]

  if (spellName == 'hex' || spellName == 'atk1' || spellName == 'atk2') {
    if (player.actionPoints >= spell.cost) {
      const { damage, crit } = getSpellDamage(player, spell.min, spell.max)
      changeActionPoints(_id, arenaId, -spell.cost)
      emitSocketEvent(
        'entity.spell',
        JSON.stringify({
          spell: spellName,
          target: targetId,
          caster: _id,
          crit,
          damage,
          arenaId,
        })
      )
      changeEnergy(targetId, arenaId, -damage)
      if (spellName === 'hex') {
        addHexCondition(target)
      }
    } else {
      throw new Error('2001')
    }
  }
  return 200
}
