const constants = require('../../../utils/constants')
const getUUID = require('../../../utils/getUUID')

module.exports = async (witchname, avatar, arenaId) => {
  return {
    _id: getUUID(),
    entity: 'witch',
    energy: constants.totalEnergy,
    actionPoints: constants.baseActionPoints,
    buffs: {},
    avatar,
    witchname,
    state: 'active',
    lightSchool: false,
    arenaId,
  }
}
