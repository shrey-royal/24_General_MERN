import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const addressSchema = new mongoose.Schema({
    fullName: String,
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    phone: String,
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minLength: 6 },
    role: {
        type: String,
        enum: ["user", "seller", "admin"],
        default: "user",
    },
    isVerified: { type: Boolean, default: false },
    verifyToken: String,
    verifyTokenExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    addresses: [addressSchema],
}, { timestamps: true });

// Hash password before save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);