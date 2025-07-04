const Product = require("../models/Product");

// Add product
exports.addProduct = async (req, res) => {
  const { name, price, description, image } = req.body;
  try {
    const newProduct = await Product.create({ name, price, description, image });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Failed to add product" });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

