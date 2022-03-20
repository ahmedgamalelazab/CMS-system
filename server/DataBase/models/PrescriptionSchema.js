const mongoose = require("mongoose");

/******* Prescription  *********/
const PrescriptionSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Patient'
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'
    },
    clinicId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Clinic'

    },
    listOfMedicines: {
        type: [String]
    },
    date: {
        type: Date
    },
    invoice: {
        id: {
            type: mongoose.Schema.Types.ObjectId
        },
        doctorName: {
            type: String
        },
        clinicName: {
            type: String
        },
        patientName: {
            type: String
        },
        createdAt: {
            type: Date
        },
        totalPrice: {
            type: Number
        },
        paymentType: {
            type: String,
            enum: ['cash', 'visa'],
            default: 'cash'
        }
    }
})

module.exports = mongoose.model("Prescription", PrescriptionSchema);

