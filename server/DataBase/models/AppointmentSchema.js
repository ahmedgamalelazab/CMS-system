const mongoose = require("mongoose");

/******* Appointment  *********/
const AppointmentSchema = new mongoose.Schema({
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'
    },
    date: {
        type: Date,
    },
    time: {
        type: String
    },
    Patient_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Patient'

    },
    isConfirmed: {
        type: Boolean
    },
    totalPrice: {
        type: Number
    },
    paymentType: {
        type: String,
        enum: ['cash', 'visa'],
        default: 'cash'
    }
})
module.exports = mongoose.model("Appointment", AppointmentSchema);