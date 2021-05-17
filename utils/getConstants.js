const { ConstantsModel } = require('../models/Constant')

let constants = {}

module.exports.getConstants = async (refresh = false) => {
  if (!constants['totalEnergy'] || refresh) {
    const data = await ConstantsModel.find({}).lean()
    data.map((x) => {
      constants[x._id] = x.value
    })
  }
  return constants
}
