'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShipmentSchema extends Schema {
  up () {
    this.create('shipments', (table) => {
      table.increments()
      table.bigInteger('tracking_number').unique()
      table.string('shipment_type')
      table.json('address_from')
      table.json('address_to')
      table.json('parcels')
      table.integer('status').defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('shipments')
  }
}

module.exports = ShipmentSchema
