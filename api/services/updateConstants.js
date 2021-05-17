const { ConstantsModel } = require('../../models/Constant')
const { emitConstantUpdate } = require('../../socketManager')
const { getConstants } = require('../../utils/getConstants')

module.exports = async ({ constants }) => {
  for (const key in constants) {
    const value = constants[key]
    await ConstantsModel.updateOne({ _id: key }, { value }, { upsert: true })
  }
  await getConstants(true)
  emitConstantUpdate(constants)
  return 200
}
