const Product = require("../models/Product");

// @desc   Add new product
// @route  POST /api/products/add
exports.addProduct = async (req, res) => {
  const { name, price, description, image } = req.body;

  // ✅ Basic validation
  if (!name || !price || typeof price !== "number") {
    return res.status(400).json({ success: false, message: "Invalid product data" });
  }

  try {
    const newProduct = await Product.create({ name, price, description, image });
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.error("Add Product Error:", err.message);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
};

// @desc   Get all products
// @route  GET /api/products/all
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error("Fetch Products Error:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};
