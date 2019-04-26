'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Shipment extends Model {
    sender () {
        return this.belongsTo('App/Models/Sender')
    }

    receiver () {
        return this.belongsTo('App/Models/Receiver')
    }
}

module.exports = Shipment
