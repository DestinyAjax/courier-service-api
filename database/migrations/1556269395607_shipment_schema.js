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
      table.string('weight')
      table.string('distance')
      table.string('width')
      table.string('height')
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
