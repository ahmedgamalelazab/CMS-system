const mongoose = require('mongoose');

//user schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.String,
    },
    password: {
      type: mongoose.SchemaTypes.String,
    },
    userType: {
      type: mongoose.SchemaTypes.String,
      enum: ['doctor', 'employee'],
      default: 'doctor',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
