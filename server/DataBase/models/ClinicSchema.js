const mongoose = require("mongoose");
const DoctorSchema = require("./DoctorSchema");
/******* Clinic  *********/
const ClinicSchema = new mongoose.Schema({
    name: {
        type: String
    },
    // doctors:type:[ DoctorSchema],
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],

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
