//cleaned
const mongoose = require('mongoose');
const User = require('./User');
const doctorSchema = new mongoose.Schema(
  {
    name: mongoose.SchemaTypes.String,
    age: mongoose.SchemaTypes.Number,
    // salary: mongoose.SchemaTypes.Number, // not make sense to make cms with salary for the doctor
    //we can use the ref like that  but i love to make it with another way
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
      default:
        'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
    },
    assignedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      default: null,
    },
    isConnectedToClinic: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//connect the Doctor with the user Model
doctorSchema.path('user').ref(User); //much more clean

const Doctor = mongoose.model('Doctor', doctorSchema);

doctorSchema.path('assignedBy').ref(Doctor);

module.exports = {
  Doctor,
  doctorSchema,
};
