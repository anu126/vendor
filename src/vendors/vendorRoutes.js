const router = require('express').Router();
const {getVendor, getOneVendor, addVendor, updateVendor, deleteVendor} = require('./vendorController')

router.get('/', getVendor)
router.get('/:id',getOneVendor)
router.post('/', addVendor)
router.put('/:id', updateVendor)
router.delete('/:id', deleteVendor)

module.exports = router;