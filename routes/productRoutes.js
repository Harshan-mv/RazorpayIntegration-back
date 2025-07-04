const express = require("express");
const router = express.Router();
const { addProduct, getProducts } = require("../controllers/productController");

router.post("/add", addProduct);      // Admin only
router.get("/all", getProducts);      // Public

module.exports = router;
