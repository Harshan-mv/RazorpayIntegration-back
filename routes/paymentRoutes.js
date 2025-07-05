const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../controllers/paymentController");
const auth = require("../middleware/auth");

// @route   POST /api/payment/create-order
// @desc    Create Razorpay order
router.post("/create-order", createOrder);

// @route   POST /api/payment/verify
// @desc    Verify Razorpay payment signature
router.post("/verify", auth, verifyPayment);

module.exports = router;
