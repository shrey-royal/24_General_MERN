const express = require('express')
const router = express.Router();
const productController = require('../controller/ProductController')

router.route('/')
    .post(productController.createProduct)
    .get(productController.getAllProducts);

router.route('/id/:id')
    .get(productController.getProductById)
    .put(productController.updateProductById)
    .delete(productController.deleteProduct);

module.exports = router;