//cleaned
const mongoose = require('mongoose');
const User = require('./User.js');
const Clinic = require('./Clinic');
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
    },
    age: {
      type: mongoose.SchemaTypes.Number,
    },
    salary: {
      type: mongoose.SchemaTypes.Number,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    clinic: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    //whoever gonna assign a employee should be a clinic owner [doctor]
    assignedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Doctor',
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.path('user').ref(User);
employeeSchema.path('clinic').ref(Clinic);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
