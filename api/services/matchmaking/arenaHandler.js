const arenas = {}

module.exports.getArenas = () => {
  const keys = Object.keys(arenas).filter((arn) => !arn.started)
  const temp = {}
  keys.map((k) => (temp[k] = arenas[k]))
  return temp
}

module.exports.addArena = (arena) => (arenas[arena._id] = arena)

module.exports.getArena = (id) => arenas[id]

module.exports.removeArena = (id) => delete arenas[id]
