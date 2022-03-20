const mongoose = require('mongoose');
const Clinic = require('./Clinic.js');
const patientSchema = new mongoose.Schema(
  {
    firstName: {
      type: mongoose.SchemaTypes.String,
    },
    lastName: {
      type: mongoose.SchemaTypes.String,
    },
    age: {
      type: mongoose.SchemaTypes.Number,
    },
    gender: {
      type: mongoose.SchemaTypes.String,
      enum: ['m', 'f'],
      default: 'm',
    },
    phone: {
      type: mongoose.SchemaTypes.String,
    },
    profileImage: {
      type: mongoose.SchemaTypes.String,
    },
    clinic: {
      type: mongoose.SchemaTypes.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

patientSchema.path('clinic').ref(Clinic);

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
