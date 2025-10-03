const express = require("express");
const router = express.Router();
const { getAddresses, addAddress, updateAddress } = require("../controllers/addressController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);
router.get("/", getAddresses);
router.post("/", addAddress);
router.put("/:index", updateAddress);

module.exports = router;
