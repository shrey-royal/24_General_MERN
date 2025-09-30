import crypto from "crypto";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { sendMail } from "../utils/sendMail.js";

const createVerificationToken = () => {
    return crypto.randomBytes(32).toString("hex");
};

export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const existing = await User.findOne({ email });
        if (existing) {
            res.status(400);
            throw new Error("User already exists with this email");
        }

        const user = await User.create({ name, email, password, role });

        const verificationToken = createVerificationToken();
        const hashed = crypto.createHash("sha256").update(verificationToken).digest("hex");
        user.verifyToken = hashed;
        user.verifyTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hrs
        await user.save();

        const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}&id=${user._id}`;
        const message = `
            <p>Hello ${user.name},</p>
            <p>Thanks for registering. Click the link to verify your email:</p>
            <p><a href="${verifyUrl}">Verify Email</a></p>
            <p>This link expires in 24 hours.</p>
        `;

        await sendMail({ to: user.email, subject: "Verify your email", html: message });

        res.status(201).json({ message: "User registered. Verification email sent." });
    } catch (err) {
        next(err);
    }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token, id } = req.query;
    if (!token || !id) {
      res.status(400);
      throw new Error("Invalid verification link");
    }
    const hashed = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      _id: id,
      verifyToken: hashed,
      verifyTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400);
      throw new Error("Verification link invalid or expired");
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpires = undefined;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    // Optionally require email verification:
    // if (!user.isVerified) { res.status(403); throw new Error("Please verify your email"); }

    const token = generateToken(user);

    // You can return token and user data
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error("No user found with that email");
    }

    const resetToken = createVerificationToken();
    const hashed = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashed;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&id=${user._id}`;
    const message = `
      <p>Hello ${user.name},</p>
      <p>You requested a password reset. Click the link to set a new password:</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>
    `;

    await sendMail({ to: user.email, subject: "Password Reset Request", html: message });

    res.json({ message: "Password reset email sent" });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, id } = req.query;
    const { password } = req.body;

    if (!token || !id) {
      res.status(400);
      throw new Error("Invalid or missing token");
    }

    const hashed = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      _id: id,
      resetPasswordToken: hashed,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400);
      throw new Error("Reset token invalid or expired");
    }

    user.password = password; // pre-save hook will hash it
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password -verifyToken -resetPasswordToken");
    res.json(user);
  } catch (err) {
    next(err);
  }
};