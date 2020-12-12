const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const { config } = require('../config')
const dbPath =
  config.env === 'production'
    ? path.join('./accounts.sqlite')
    : path.join(__dirname, '../db/accounts.sqlite')
const db = new sqlite3.Database(dbPath)

const getBalance = (account, callback) => {
  const statement = `SELECT * FROM accounts WHERE id='${account}'`
  db.get(statement, [], (err, result) => {
    if (err) {
      console.error(err)
      callback(err, null)
    } else {
      callback(null, result)
    }
  })
}

module.exports = { getBalance }
