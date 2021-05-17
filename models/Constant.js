const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  _id: String,
  value: {
    type: Number,
    required: true,
  },
})

const ConstantsModel = mongoose.model('constants', schema)

module.exports.ConstantsModel = ConstantsModel
