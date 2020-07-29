const mongoose = require('mongoose')
const vendor = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    created_time : {
        type : Date,
        default : Date.now
    }
})


module.exports = mongoose.model('vendors',vendor)