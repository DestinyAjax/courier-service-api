'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShipmentSchema extends Schema {
  up () {
    this.create('shipments', (table) => {
      table.increments()
      table.bigInteger('tracking_number').unique()
      table.string('shipment_type')
      table.integer('sender_id')
      table.integer('receiver_id')
      table.integer('parcel')
      table.float('weight')
      table.float('distance')
      table.float('width')
      table.float('height')
      table.string('origin')
      table.string('destination')
      table.string('depth').nullable()
      table.integer('status').defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('shipments')
  }
}

module.exports = ShipmentSchema
