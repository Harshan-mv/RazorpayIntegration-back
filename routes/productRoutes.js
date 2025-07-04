const express = require("express");
const router = express.Router();
const { addProduct, getProducts } = require("../controllers/productController");

// 📌 POST: Add new product (Admin access in future)
router.post("/add", addProduct);

// 📌 GET: Get all products
router.get("/all", getProducts);

module.exports = router;
