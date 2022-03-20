/**
 * @description
 */

const mongoose = require('mongoose');
const Doctor = require('./Doctor.js');
const Patient = require('./Patient.js');
const Clinic = require('./Clinic.js');
const { Medicine, medicineSchema } = require('./Medicine.js');

const prescriptionSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    clinic: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    patient: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    medicine: {
      type: [medicineSchema],
      required: false,
    },
    date: {
      type: mongoose.SchemaTypes.Date,
      default: date.now,
    },
    hasPayed: {
      type: mongoose.SchemaTypes.Boolean,
    },
    totalPrice: {
      type: mongoose.SchemaTypes.Number,
    },
    paymentMethod: {
      type: mongoose.SchemaTypes.String,
      enum: ['cash', 'visa'],
      default: 'cash',
    },
  },
  {
    timestamps: true,
  }
);

prescriptionSchema.path('doctor').ref(Doctor);
prescriptionSchema.path('clinic').ref(Clinic);
prescriptionSchema.path('patient').ref(Patient);

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
