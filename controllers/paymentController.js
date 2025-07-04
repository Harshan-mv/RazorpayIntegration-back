const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // in paisa
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Razorpay order creation failed" });
  }
};
