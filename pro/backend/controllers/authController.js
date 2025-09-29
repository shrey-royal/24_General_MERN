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

// export const verifyEmail = 