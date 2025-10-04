const express = require("express");
const router = express.Router();
const { registerUser, authUser, getUserProfile } = require("../controllers/authController");
const { updateUserProfile, deleteUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;
