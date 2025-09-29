import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ["percentage", "fixed"], required: true },
    value: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    minAmount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("Coupon", couponSchema);
