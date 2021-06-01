const constants = require('../../../../../utils/constants')
const { getDamage } = require('../../../../../utils/getDamage')

module.exports = (player, min, max) => {
  let crit = constants.critHit
  Object.values(player.buffs).forEach((buff) => {
    if (
      buff.type === 'hex' &&
      buff.startedOn + constants.hexTime * 1000 > Date.now()
    ) {
      crit += constants.critPerHex
    }
  })
  let hasCrit = Math.random() <= crit

  const damage = getDamage(min, max) * (hasCrit ? constants.critMultiplier : 1)
  return {
    damage,
    crit: hasCrit,
  }
}
