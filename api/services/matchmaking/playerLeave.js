const { emitSocketEvent } = require('../../../socketManager')
const handleWinner = require('../battle/handleWinner')
const { getArena } = require('./arenaHandler')

module.exports = async ({ _id, arenaId }) => {
  const arena = await getArena(arenaId)
  if (arena) {
    delete arena.entities[_id]
    emitSocketEvent('arena.left', { _id, arenaId })
    handleWinner(arenaId)
  }
  return 200
}
