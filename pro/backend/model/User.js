import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    addresses: [
        {
            fullName: String,
            street: String,
            city: String,
            state: String,
            country: String,
            postalCode: String,
            phone: String,
        },
    ],
}, { timestamps: true });

// Hash password before save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);