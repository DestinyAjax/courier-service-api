class Validator {
    static shipmentFormRules() {
        return {
            sender_email: 'required|email',
            sender_address: 'required',
            sender_number: 'required',
            sender_city: 'required',
            sender_name: 'required|string',
            receiver_email: 'required|email',
            receiver_address: 'required',
            receiver_number: 'required',
            receiver_city: 'required',
            receiver_name: 'required|string',
            weight: 'required',
            distance: 'required',
            shipment_type: 'required',
            height: 'required',
            width: 'required',
            parcel: 'required'
        }
    }
}

module.exports = Validator