const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    age: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("users", userSchema)