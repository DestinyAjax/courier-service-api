
const Billing = use('App/Models/Billing')
class Helpers {

    static getTrackingNumber () {
        const number = new Date().getTime()
        return number
    }

    static getShipmentStatus(status) {
        switch (status) {
            case 1:
                return "Booked"
                break;

            case 2:
                return "In Transit"
                break;

            case 3:
                return "Picked Up"
                break;

            case 4:
                return "Canceled"
                break;
        
            default:
                return "Pending"
                break;
        }
    }

    static getBillingStatus(status) {
        switch (status) {
            case 1:
                return "Pending"
                break;

            case 2:
                return "Paid"
                break;
        
            default:
                return "Billed"
                break;
        }
    }

    static generateBilling (shipment) {
        if(!shipment) return

        const billing = new Billing()
        billing.rate = 100.00
        billing.shipment_cost = 100.00 * shipment.weight
        billing.shipment_id = shipment.id
        billing.status = 1
        billing.save()

        return billing
    }
}

module.exports = Helpers