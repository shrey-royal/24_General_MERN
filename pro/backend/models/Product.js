const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a product name"],
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
    },
    price: {
        type: Number,
        required: [true, "Please add a price"],
        default: 0,
    },
    image: {
        type: String,
        required: false,
        default: "https://placehold.co/150",
    },
    category: {
        type: String,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);