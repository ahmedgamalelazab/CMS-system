/**
 * @description
 */
//cleaned
const mongoose = require('mongoose');
<<<<<<< HEAD
const { Doctor } = require('./Doctor.js');
=======
const Doctor = require('./Doctor.js');
>>>>>>> master
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
      default: Date.now,
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
    //this is because i will keep the data when i remove the connected doctor so i need to know if this prescription tied to a doctor or not
    tiedToDoctor: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
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
