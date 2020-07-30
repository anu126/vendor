const mongoose = require('mongoose');

/**
 * @swagger
 *   components:
 *     schemas:
 *       vendor:
 *           type: "object"
 *           properties:
 *              name:
 *                  type: "string"
 *              age:
 *                  type: "number"
 *              email:
 *                  type: "string"
 *              _id:
 *                  type: "string"
 *              created_time:
 *                  type: "string"
 *                  format: "date-time"
 *              __v:
 *                  type: "number"
 *              products:
 *                  type: "array"
 *                  items:
 *                      type: "object"
 *                      properties:
 *                          product_name:
 *                              type: "string"
 *                          product_price:
 *                              type: "number"
 *                          product_description:
 *                              type: "string"
 *                          _id:
 *                              type: "string"
 *                          __v:
 *                              type: "number" 
 *           required:
 *              - "name"
 *              - "age"
 *              - "email"
 */
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
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        unique: true
    },
    created_time : {
        type : Date,
        default : Date.now
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    }]
})


module.exports = mongoose.model('vendors',vendor)