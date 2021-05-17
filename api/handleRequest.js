const handleError = require('../utils/handleError')

async function handleRequest(req, res, apiFunction) {
  try {
    const payload = await apiFunction(req.body)
    return typeof payload === 'number'
      ? res.sendStatus(payload)
      : res.json(payload)
  } catch (err) {
    if (err.message.length === 4) {
      console.error(err)
      res.json(err.message)
    } else handleError(err, res)
  }
}

module.exports.handleRequest = handleRequest
