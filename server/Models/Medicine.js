const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
    },
    price: {
      type: mongoose.SchemaTypes.Number,
    },
    // timestamps: { createdAt: true, updatedAt: false },
  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = {
  Medicine,
  medicineSchema,
};
