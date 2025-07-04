const Razorpay = require("razorpay");
const crypto = require("crypto");

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Missing Razorpay credentials in environment");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc   Create Razorpay Order
// @route  POST /api/payment/create-order
exports.createOrder = async (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    const options = {
      amount: amount * 100, // in paisa
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (err) {
    console.error("Razorpay Order Error:", err.message);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
};

// @desc   Verify Razorpay Payment Signature
// @route  POST /api/payment/verify
exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: "Missing payment details" });
  }

  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }
  } catch (err) {
    console.error("Payment Verification Error:", err.message);
    res.status(500).json({ success: false, message: "Server error during verification" });
  }
};
