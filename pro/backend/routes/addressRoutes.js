const express = require("express");
const router = express.Router();
const { getAddresses, addAddress, updateAddress, deleteAddress } = require("../controllers/addressController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);
router.get("/", getAddresses);
router.post("/", addAddress);
router.put("/:index", updateAddress);
router.delete("/:index", deleteAddress);

module.exports = router;
