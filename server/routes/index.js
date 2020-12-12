'use strict'

const homeRoute = require('./home')
const errorRoute = require('./error')

const { getBalance } = require('../src/api/index')

/**
 * Initializing routes
 */
const init = (app) => {
  app.use('/api/get/:acc', function (req, res, next) {
    const account = req.params.acc
    getBalance(account, (err, result) => {
      if (err) {
        res.status(200)
        res.json({ error: 'Not found' })
      } else if (!err && result) {
        res.status(200)
        res.json(result)
      } else if (!err && !result) {
        res.status(200)
        res.json({ error: 'Not found' })
      }
    })
  })
  app.use('*', homeRoute)
  app.use('*', errorRoute)
}

module.exports = {
  init
}
