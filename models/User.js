const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  house: String,
  street: String,
  town: String,
  district: String,
  state: String,
  pincode: String
}, { _id: true });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'admin'
  },
  addresses: {
    type: [addressSchema],
    default: [],
    validate: [arr => arr.length <= 3, 'Maximum 3 addresses allowed']
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

