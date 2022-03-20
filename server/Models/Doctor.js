//DOCTOR is depending on the user
const mongoose = require('mongoose');
const User = require('./User');
const doctorSchema = new mongoose.Schema(
  {
    name: mongoose.SchemaTypes.String,
    age: mongoose.SchemaTypes.Number,
    salary: mongoose.SchemaTypes.Number,
    //we can use the ref like that , but me i love to make it with another way
    //   user: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'User',
    //   },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    isOwner: {
      type: mongoose.SchemaTypes.Boolean,
    },
    profileImage: {
      type: mongoose.SchemaTypes.String,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

//connect the Doctor with the user Model
doctorSchema.path('user').ref(User); //much more clean

const Doctor = mongoose.model('Doctor', doctorSchema);

doctorSchema.path('owner').ref(Doctor);

module.exports = {
  Doctor,
  doctorSchema,
};
