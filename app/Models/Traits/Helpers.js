
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

    static generateBilling () {

    }
}

module.exports = Helpers