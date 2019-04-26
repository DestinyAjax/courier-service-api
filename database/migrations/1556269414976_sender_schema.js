'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SenderSchema extends Schema {
  up () {
    this.create('senders', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('senders')
  }
}

module.exports = SenderSchema
