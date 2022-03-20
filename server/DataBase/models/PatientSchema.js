const mongoose = require("mongoose");

/******* Patient  *********/
const PatientSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    createdAt: {
        type: Date,
        default:()=>Date.now(),
    },
    phone: {
        type: String
    },
    image: {
        type: String
    },
    prescription: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }],
    clinic_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Clinic'
    },
    Owner: {
        // type: DoctorSchema
        type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'

    }
})
module.exports = mongoose.model("Patient", PatientSchema);
