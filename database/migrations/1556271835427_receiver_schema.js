'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReceiverSchema extends Schema {
  up () {
    this.create('receivers', (table) => {
      table.increments()
      table.string('name')
      table.string('city')
      table.string('country').nullable()
      table.string('zip_code').nullable()
      table.string('address')
      table.string('mobile_number')
      table.string('email')
      table.timestamps()
    })
  }

  down () {
    this.drop('receivers')
  }
}

module.exports = ReceiverSchema
