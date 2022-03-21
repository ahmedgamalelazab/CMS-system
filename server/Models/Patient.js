//cleaned
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
      default:
        'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
    },
    clinic: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    //if the patient tiedTo array is empty then this patient is not connected to any doctor
    //then the admin can delete the data or keep the data upon this piece of the information
    tiedTo: {
      type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Doctor' }],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

patientSchema.path('clinic').ref(Clinic);

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
