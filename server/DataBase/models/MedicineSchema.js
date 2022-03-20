const mongoose = require("mongoose");



/******* Medicine  *********/
const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    price: {
        type: Number
    }
})

module.exports = mongoose.model("Medicine", medicineSchema);

