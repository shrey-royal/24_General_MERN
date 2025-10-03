const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const getAddresses = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user.addresses || []);
});

const addAddress = asyncHandler(async (req, res) => {
    const {
        name,
        line1,
        line2,
        city,
        state,
        postalCode,
        country,
        phone,
        isDefault,
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (isDefault) {
        // unset previous default
        user.addresses = user.addresses.map((a) => ({ ...a.toObject(), isDefault: false }));
    }

    user.addresses.push({
        name,
        line1,
        line2,
        city,
        state,
        postalCode,
        country,
        phone,
        isDefault: !!isDefault,
    });

    await user.save();
    res.status(201).json(user.addresses);
});

const updateAddress = asyncHandler(async (req, res) => {
    const idx = parseInt(req.params.index, 10);
    const user = await User.findById(req.user.id);

    if (!user || isNaN(idx) || idx < 0 || idx >= user.addresses.length) {
        res.status(404);
        throw new Error("Address not found");
    }

    const updated = { ...user.addresses[idx].toObject(), ...req.body };
    user.addresses[idx] = updated;

    if (req.body.isDefault) {
        user.addresses = user.addresses.map((a, i) => ({ ...a.toObject(), isDefault: i === idx }));
    }

    await user.save();
    res.json(user.addresses);
});

module.exports = { getAddresses, addAddress, updateAddress };
