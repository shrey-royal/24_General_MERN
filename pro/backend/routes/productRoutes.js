const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.route("/")
  .get(getProducts)
  .post(upload.single("image"), createProduct);

router.route("/:id")
  .get(getProductById)
  .put(upload.single("image"), updateProduct)
  .delete(deleteProduct);

module.exports = router;
