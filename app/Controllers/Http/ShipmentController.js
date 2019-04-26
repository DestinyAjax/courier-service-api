'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Shipment = use('App/Models/Shipment')
const Sender = use('App/Models/Sender')
const Receiver = use('App/Models/Receiver')
const Helpers = use('App/Models/Traits/Helpers')
const Validator = use('App/Models/Traits/Validator')
const { validate } = use('Validator')

/**
 * Resourceful controller for interacting with shipments
 */
class ShipmentController {
  /**
   * Show a list of all shipments.
   * GET shipments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response}) {
    const records = await Shipment.query().with('sender').with('receiver').fetch()

    response.status(201).json({
      status: 'success',
      data: records
    })
  }

  /**
   * Create/save a new shipment.
   * POST shipments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const validation = await validate(request.all(), Validator.shipmentFormRules())
    if (validation.fails()) {
      return {
        status: 'failed',
        errors: validation.messages()
      }
    }

    const sender = request.only(['sender_name', 'sender_address', 'sender_number', 'sender_city', 'sender_country', 'sender_email', 'sender_zipcode'])
    const receiver = request.only(['receiver_name', 'receiver_number', 'receiver_city', 'receiver_country', 'receiver_zipcode', 'receiver_email', 'receiver_address'])
    const params = request.only(['height', 'weight', 'distance', 'depth', 'shipment_type', 'parcel', 'width'])

    let tracking_number = Helpers.getTrackingNumber()
    let sender_id = await this.createSender(sender)
    let receiver_id = await this.createReceiver(receiver)

    const shipment = new Shipment()
    shipment.sender_id = sender_id
    shipment.receiver_id = receiver_id
    shipment.parcel = params.parcel
    shipment.height = params.height
    shipment.width = params.width
    shipment.origin = sender.sender_address.toUpperCase()
    shipment.destination = receiver.receiver_address.toUpperCase()
    shipment.depth = (params.depth) ? params.depth : null
    shipment.shipment_type = params.shipment_type
    shipment.distance = params.distance
    shipment.tracking_number = tracking_number
    shipment.weight = params.weight
    await shipment.save()

    const billing = Helpers.generateBilling(shipment)

    response.status(200).json({
      status: 'success',
      data: {
        "sender": await shipment.sender().fetch(),
        "receiver": await shipment.receiver().fetch(),
        "parcel": shipment.parcel,
        "height": shipment.height,
        "width": shipment.width,
        "depth": shipment.depth,
        "shipment_type": shipment.shipment_type,
        "distance": shipment.distance,
        "weight": shipment.weight,
        "tracking_number": shipment.tracking_number,
        "origin": shipment.origin,
        "destination": shipment.destination,
        "created_at": shipment.created_at,
        "id": shipment.id,
        "billing_details": billing
      }
    }) 
  }

  async createReceiver(params) {
    if(!params) return;

    const receiver = new Receiver()
    receiver.name = params.receiver_name
    receiver.city = params.receiver_city
    receiver.country = (params.receiver_country) ? params.receiver_country : null
    receiver.mobile_number = params.receiver_number
    receiver.zip_code = (params.receiver_zipcode) ? params.receiver_zipcode : null
    receiver.email = params.receiver_email
    receiver.address = params.receiver_address
    await receiver.save()

    return receiver.id
  }

  async createSender(params) {
    if(!params) return;

    const sender = new Sender()
    sender.name = params.sender_name
    sender.city = params.sender_city
    sender.country = (params.sender_country) ? params.sender_country : null
    sender.mobile_number = params.sender_number
    sender.zip_code = (params.sender_zipcode) ? params.sender_zipcode : null
    sender.email = params.sender_email
    sender.address = params.sender_address
    await sender.save()

    return sender.id
  }

  /**
   * Display a single shipment.
   * GET shipments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    if(!params.id) return;
    const shipment = await Shipment.find(params.id)
    
    response.status(200).json({
      status: 'success',
      data: {
        "sender": await shipment.sender().fetch(),
        "receiver": await shipment.receiver().fetch(),
        "parcel": shipment.parcel,
        "height": shipment.height,
        "width": shipment.width,
        "depth": shipment.depth,
        "shipment_type": shipment.shipment_type,
        "distance": shipment.distance,
        "weight": shipment.weight,
        "tracking_number": shipment.tracking_number,
        "origin": shipment.origin,
        "destination": shipment.destination,
        "created_at": shipment.created_at,
        "id": shipment.id
      }
    }) 
  }

  /**
   * Update shipment details.
   * PUT or PATCH shipments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async track ({ params, request, response }) {
    if(!params.tracking_number) return

    const shipment = await Shipment.findBy('tracking_number', params.tracking_number)
    if(shipment) {
      response.status(200).json({
        status: 'success',
        data: {
          "parcel": shipment.parcel,
          "distance": shipment.distance + " mi",
          "weight": shipment.weight + " kg",
          "origin": shipment.origin,
          "destination": shipment.destination,
          "created_at": shipment.created_at,
          "status": Helpers.getShipmentStatus(shipment.status)
        }
      }) 
    } else {
      response.status(200).json({
        status: 'success',
        data: {}
      })
    }
  }

  /**
   * Delete a shipment with id.
   * DELETE shipments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ShipmentController
