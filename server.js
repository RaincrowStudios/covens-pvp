const mongoose = require('mongoose')
const api = require('./api/api')
const uri = require('../keys/keys.json').mongodb
// const { emitSocketEvent } = require('./socketManager')
;(async function start() {
  mongoose.set('useFindAndModify', false)
  mongoose.set('useCreateIndex', true)
  await mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  api.listen(7001, () => {
    console.log('server started at 7001')
    console.log('connected to db')
  })
})()
