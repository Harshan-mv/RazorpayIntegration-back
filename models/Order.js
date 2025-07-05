const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  address: {
    house: String,
    street: String,
    town: String,
    district: String,
    state: String,
    pincode: String
  },
  payment: {
    orderId: String,
    paymentId: String,
    signature: String
  },
  shipped: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema); 