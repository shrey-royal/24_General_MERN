import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shopName: { type: String, required: true },
    logo: { type: String },
    gstNumber: { type: String },
    description: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    earnings: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Seller", sellerSchema);