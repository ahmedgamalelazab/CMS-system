const mongoose = require("mongoose");

/******* Clinic  *********/
const ClinicSchema = new mongoose.Schema({
    name: {
        type: String
    },
    doctors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'}],//array of doctor
    address: {
        type: String
    },
    phone: {
        type: String
    },
    description: {
        type: String
    },
    Owner: {
        // type: DoctorSchema
        type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'
    }
})
module.exports = mongoose.model("Clinic", ClinicSchema);
