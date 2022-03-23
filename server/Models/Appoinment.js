<<<<<<< HEAD

const mongoose = require('mongoose');

const Doctor = require('./Doctor.js');

=======
//cleaned
const mongoose = require('mongoose');
const Clinic = require('./Clinic.js');
const {Doctor} = require('./Doctor.js');
>>>>>>> master
const Patient = require('./Patient.js');

const appointmentSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
=======
    clinic: {
      type: mongoose.SchemaTypes.ObjectId,
    },
>>>>>>> master
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

<<<<<<< HEAD
=======
appointmentSchema.path('clinic').ref(Clinic);
>>>>>>> master
appointmentSchema.path('doctor').ref(Doctor);
appointmentSchema.path('patient').ref(Patient);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
