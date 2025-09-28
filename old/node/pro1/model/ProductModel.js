const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    discount: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('products', productSchema)