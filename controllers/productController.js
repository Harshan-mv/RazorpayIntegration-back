const Product = require("../models/Product");
const path = require('path');

// @desc   Add new product
// @route  POST /api/products/add
exports.addProduct = async (req, res) => {
  const { name, price, description, quantity } = req.body;
  let image = null;
  if (req.file) {
    image = req.file.filename; // Save only the filename
  }

  // ✅ Basic validation
  if (!name || !price || isNaN(Number(price)) || quantity === undefined || isNaN(Number(quantity))) {
    return res.status(400).json({ success: false, message: "Invalid product data" });
  }

  try {
    const newProduct = await Product.create({ name, price, description, image, quantity });
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

// @desc   Delete a product
// @route  DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
};
