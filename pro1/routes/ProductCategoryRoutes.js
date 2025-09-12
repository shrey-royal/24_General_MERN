const express = require('express')
const router = express.Router();
const productCategoryController = require('../controller/ProductCategoryController')

router.post('/', productCategoryController.createCategory);
router.get('/', productCategoryController.getAllCategory);

module.exports = router;