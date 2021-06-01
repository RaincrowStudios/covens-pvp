Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)]
}

module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports.getRandom = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.random() * (max - min + 1) + min
}

module.exports.clampValue = (value, min, max) => {
  if (value < min) value = min
  if (value > max) value = max
  return value
}
