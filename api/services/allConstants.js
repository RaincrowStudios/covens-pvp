const constants = require('../../utils/constants')

module.exports = async () => {
  const payload = {}
  Object.keys(constants.spell).map((sp) => {
    payload[sp] = constants.spell[sp].cost
  })

  return { ...constants, spell: payload }
}
