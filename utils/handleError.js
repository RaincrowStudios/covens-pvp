module.exports = (err, res) => {
  console.error(err)
  if (res) {
    return res.json({ error: err.message })
  } else {
    return true
  }
}
