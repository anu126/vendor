const mongoose = require('mongoose')
const product = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    vendors: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }],
})

module.exports = mongoose.model('products',product)