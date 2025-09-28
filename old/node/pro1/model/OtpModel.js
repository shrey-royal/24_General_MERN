const mongoose = require('mongoose');
const schema = mongoose.Schema;

const otpSchema = new schema({
    email: {
        type: String,
    },
    otp: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('otp', otpSchema);