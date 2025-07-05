const express = require("express");
const router = express.Router();
const { addProduct, getProducts, deleteProduct } = require("../controllers/productController");
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/auth');

// Multer setup for image upload
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save to uploads/ directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, JPEG, or PNG images are allowed'), false);
  }
};
const upload = multer({ storage, fileFilter });

// 📌 POST: Add new product (Admin access in future)
router.post("/add", upload.single('image'), addProduct);

// 📌 GET: Get all products
router.get("/all", getProducts);

// 📌 DELETE: Delete a product (Admin only)
router.delete('/:id', auth, isAdmin, deleteProduct);

module.exports = router;
