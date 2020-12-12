'use strict'

const config = require('./config')
const show = require('./logging')
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

/**
 * Express configuration
 * @function
 */
const init = () => {
  const app = express()
  const corsOptions = {
    origin: true,
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': true,
    'Access-Control-Allow-Headers': true,
    'Access-Control-Expose-Headers': true,
    credentials: true
  }
  app.use('/static', express.static(config.clientStaticFolder))
  app.use('/', express.static(config.clientBuildFolder))
  app.set('views', config.clientBuildFolder)
  app.engine('html', require('ejs').renderFile)
  app.set('view engine', 'html')
  app.use(cors(corsOptions))
  app.use(helmet())
  app.use('/api', (req, res, next) => {
    show.info(`/api/${req.path} requested`)
    next()
  })
  return app
}

module.exports = {
  init
}