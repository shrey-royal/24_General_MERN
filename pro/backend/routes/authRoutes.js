import express from "express";
import {
    register,
    verifyEmail,
    login,
    forgotPassword,
    resetPassword,
    getMe,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.get("/verify", verifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", protect, getMe);


export default router;