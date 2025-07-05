const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Get all addresses
router.get('/addresses', auth, userController.getAddresses);
// Add address
router.post('/address', auth, userController.addAddress);
// Edit address
router.put('/address/:addressId', auth, userController.editAddress);
// Delete address
router.delete('/address/:addressId', auth, userController.deleteAddress);

// Admin: Get all orders
router.get('/orders', auth, userController.getAllOrders);
// Admin: Update shipped status
router.patch('/order/:orderId/shipped', auth, userController.updateOrderShipped);

// User: Get my orders
router.get('/myorders', auth, userController.getMyOrders);

module.exports = router; 