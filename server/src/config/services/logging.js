'use strict'
const fs = require('fs')
const winston = require('winston')

/**
 * Create log folder
 */
const dirpath = './log'
fs.mkdirSync(dirpath, { recursive: true })

/**
 * Logging configuration (winston)
 */
let level = 'info'
if (process.env.NODE_ENV === 'development') {
  level = 'debug'
}
const show = winston.createLogger({
  level: level,

  format: winston.format.combine(
    winston.format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss'
    }),
    winston.format.colorize(),
    winston.format.printf((info) => {
      return `${info.timestamp} ${info.level}: ${info.message}`
    })
  ),
  transports: [
    new winston.transports.File({
      filename: './log/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: './log/combined.log',
      level: 'info'
    })
  ]
})

if (process.env.NODE_ENV !== 'test') {
  show.add(
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.printf((info) => {
        return `${info.timestamp} ${info.level}: ${info.message}`
      })
    })
  )
}

module.exports = show
