const User = require('../models/User');
const Order = require('../models/Order');

// Get all addresses for the logged-in user
exports.getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new address (max 3)
exports.addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.addresses.length >= 3) {
      return res.status(400).json({ message: 'Maximum 3 addresses allowed' });
    }
    user.addresses.push(req.body);
    await user.save();
    res.json({ addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Edit an address
exports.editAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const address = user.addresses.id(req.params.addressId);
    if (!address) return res.status(404).json({ message: 'Address not found' });
    Object.assign(address, req.body);
    await user.save();
    res.json({ addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an address
exports.deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.addresses.id(req.params.addressId).remove();
    await user.save();
    res.json({ addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('product', 'name image');
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Update shipped status
exports.updateOrderShipped = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const { shipped } = req.body;
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.shipped = !!shipped;
    await order.save();
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// User: Get my orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate('product', 'name price');
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 