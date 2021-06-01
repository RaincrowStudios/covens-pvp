module.exports.getDamage = (min, max) => {
  return randomInteger(min, min * max)
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
