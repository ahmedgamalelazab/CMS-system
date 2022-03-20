const mongoose = require('mongoose');
const Doctor = require('./Doctor.js');
const Patient = require('./Patient.js');

const appointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    patient: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    //simple u can push date with time in one timestamps
    date: {
      type: mongoose.SchemaTypes.Date,
      default: Date.now,
    },
    isConfirmed: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    totalPrice: {
      type: mongoose.SchemaTypes.Number,
    },
    payment: {
      type: mongoose.SchemaTypes.String,
      enum: ['cash', 'visa'],
      default: 'cash',
    },
  },
  {
    timestamps: true,
  }
);

appointmentSchema.path('doctor').ref(Doctor);
appointmentSchema.path('patient').ref(Patient);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
