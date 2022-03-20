const mongoose = require("mongoose");

/******* Doctor  *********/
const DoctorSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    salary: {
        type: Number
    },
    user: {
        userName: {
            type: String
        },
        password: {
            type: String
        }
    },
    clinic_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Clinic'
    },
    isOwner: {
        type: Boolean
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model("Doctor", DoctorSchema);

