import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            qty: Number,
            price: Number,
        },
    ],
    totalAmount: { type: Number, required: true },
    paymentInfo: {
        method: { type: String, enum: ["Stripe", "Razorpay", "COD"], default: "COD" },
        status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
        transactionId: String,
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
    shippingAddress: {
        fullName: String,
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
        phone: String,
    },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
