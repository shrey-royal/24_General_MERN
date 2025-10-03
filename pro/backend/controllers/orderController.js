const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const Product = require("../models/Product");

const addOrder = asyncHandler(async (req, res) => {
    const { orderItems, shippingAdress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
    }

    const itemsDetailed = [];
    let itemsPrice = 0;

    for (const item of orderItems) {
        const product = await Product.findById(item.product);
        if (!product) {
            res.status(404);
            throw new Error(`Product not found: ${item.product}`);
        }
        if (item.qty > product.countInStock) {
            res.status(400);
            throw new Error(`Not enough stock for ${product.name}`);
        }

        itemsDetailed.push({
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            qty: item.qty,
        });

        itemsPrice += product.price * item.qty;
    }

    const shippingPrice = itemsPrice > 2000 ? 0 : 99;
    const taxPrice = +(itemsPrice * 0.1).toFixed(2);
    const totalPrice = +(itemsPrice + shippingPrice + taxPrice).toFixed(2);

    const order = new Order({
        user: req.user.id,
        orderItems: itemsDetailed,
        shippingAdress,
        paymentMethod: paymentMethod || "COD",
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    });

    const createdOrder = await order.save();

    for (const it of itemsDetailed) {
        const p = await Product.findById(it.product);
        p.countInStock = Math.max(0, p.countInStock - it.qty);
        await p.save();
    }

    res.status(201).json(createdOrder);
});

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.id }).populate("orderItems.product", "name image");
    res.json(orders);
});

module.exports = { addOrder, getMyOrders };