const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware.js");
const { checkout } = require("../controllers/paymentController.js");

router.post("/checkout", protect, checkout);

module.exports = router;