var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('accounts.sqlite')

const ledger = require('./60155580.json')

const createTable = (json) => {
  console.log(ledger.balances.length)
  db.serialize(() => {
    db.run(
      'create table if not exists accounts (id text primary key, balance numeric)'
    )

    db.run('delete from accounts')

    const statement = db.prepare('insert into accounts values (?,?)')

    ledger.balances.slice(0, 1000).forEach((account, i) => {
      process.stdout.write(`>  ${i + 1}/${ledger.balances.length}\r`)
      statement.run([account.a, account.b])
    })
    console.log('\ndone')
    statement.finalize()
  })
}

createTable()

module.exports = createTable
