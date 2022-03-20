const mongoose = require("mongoose");

/******* Employee  *********/
const EmployeeSchema = new mongoose.Schema({
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
    }
})
module.exports = mongoose.model("Employee", EmployeeSchema);
