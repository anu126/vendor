const mongoose = require('mongoose')

/**
 * @swagger
 *   components:
 *     schemas:
 *       product:
 *           type: "object"
 *           properties:
 *              product_name:
 *                  type: "string"
 *              product_price:
 *                  type: "number"
 *              product_description:
 *                  type: "string"
 *              _id:
 *                  type: "string"
 *              __v:
 *                  type: "number"
 *              vendors:
 *                  type: "array"
 *                  items:
 *                      type: "object"
 *                      properties:
 *                          name:
 *                              type: "string"
 *                          age:
 *                              type: "number"
 *                          email:
 *                              type: "string"
 *                          _id:
 *                              type: "string"
 *                          created_time:
 *                              type: "string"
 *                              format: "date-time"
 *                          __v:
 *                              type: "number"
 *           required:
 *              - "product_name"
 *              - "product_price"
 *              - "product_description"
 */
const product = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        unique: true
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
        ref: "vendors"
    }]
})

module.exports = mongoose.model('products',product)