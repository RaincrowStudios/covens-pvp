const io = require('socket.io')(7000)

module.exports.emitGameStarted = (room) => {
  io.emit('start', room)
}

module.exports.emitConstantUpdate = (constants) => {
  io.emit('constants', constants)
}

module.exports.emitActionPointsUpdate = (payload) => {
  io.emit('actionPoints', payload)
}

module.exports.emitSpellCast = (payload) => {
  io.emit('spell', payload)
}

module.exports.emitEnergyChange = (payload) => {
  io.emit('energy', payload)
}

module.exports.emitDebuffChange = (payload) => {
  io.emit('debuffs', payload)
}

module.exports.emitHealStatus = (payload) => {
  io.emit('healStatus', payload)
}

module.exports.emitHealInfo = (payload) => {
  io.emit('healInfo', payload)
}
