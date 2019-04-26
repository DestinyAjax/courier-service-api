'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReceiverSchema extends Schema {
  up () {
    this.create('receivers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('receivers')
  }
}

module.exports = ReceiverSchema
