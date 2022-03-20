//cleaned
const mongoose = require('mongoose');
const { Doctor, doctorSchema } = require('./Doctor.js');

const clinicSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
    },
    doctors: {
      type: [doctorSchema],
      required: false,
    },
    address: {
      type: mongoose.SchemaTypes.String,
    },
    phone: {
      type: mongoose.SchemaTypes.String,
    },
    description: {
      type: mongoose.SchemaTypes.String,
    },
    //i will ref him later
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

clinicSchema.path('owner').ref(Doctor);

const Clinic = mongoose.model('Clinic', clinicSchema);

module.exports = Clinic;
