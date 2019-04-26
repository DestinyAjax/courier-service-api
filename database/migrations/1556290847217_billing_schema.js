'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BillingSchema extends Schema {
  up () {
    this.create('billings', (table) => {
      table.increments()
      table.integer('shipment_id')
      table.integer('rate')
      table.float('shipment_cost')
      table.float('vat').nullable()
      table.integer('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('billings')
  }
}

module.exports = BillingSchema
