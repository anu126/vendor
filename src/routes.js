const express = require('express');
const router = express.Router();

const vendorRouter = require('./vendors/vendorRoutes');
const productRouter = require('./products/productRoutes');

router.use('/vendor',vendorRouter)
router.use('/product', productRouter)

module.exports = router;