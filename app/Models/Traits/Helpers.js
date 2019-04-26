
class Helpers {

    static getTrackingNumber() {
        const number = new Date().getTime()
        return number
    }

    static getShippingCost(parcel, weight) {
        if(!parcel || !weight) return;

        
    }
}

module.exports = Helpers