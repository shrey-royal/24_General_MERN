const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    age: Number,
    status: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("user", userSchema)