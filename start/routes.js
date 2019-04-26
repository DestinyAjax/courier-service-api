'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  /** shipment routes endpoints */
  Route.get('shipments/all-shipments', 'ShipmentController.index')
  Route.post('shipments/store', 'ShipmentController.store') 
  Route.post('shipments/update', 'ShipmentController.update')

  /** tracking routes endpoints */
  // Route.get('tracking/track-parcel', 'TrackingController.trackParcel')

}).prefix('api/v1')
