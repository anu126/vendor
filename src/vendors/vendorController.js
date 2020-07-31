const vendorSchema = require('./vendorModel');
const productSchema = require('../products/productModel');

async function getVendor(req,res) {
    try{
        const vendors = await vendorSchema.find().populate('products');
        if(!vendors){
            return res.status(400).json({error: "no vendor found"})
        }
        return res.status(200).json({vendors: vendors})
    }
    catch(error){
        return res.status(400).json({error: error.message})
    }
}

async function getOneVendor(req,res) {
    try{
        const vendor = await vendorSchema.findById(req.params.id).populate('products');
        if(!vendor){
            return res.status(400).json({error: "no vendor found"})
        }
        else{
            return res.status(200).json(vendor)
        }
     }
     catch(error){
        return res.status(400).json({error: error.message})
    }
}

async function addVendor(req,res) {
    try { 
        const postVendor = await new vendorSchema({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        });
        const saveVendor = await postVendor.save();
        if(!saveVendor){
            throw res.status(500).json({error: 'unable to update in DB'})
        }
        const vendor = await vendorSchema.findById(saveVendor._id);
        if(!vendor){
            throw res.status(500).json({error: 'unable to show vendor'})
        }
        res.json(saveVendor);
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

async function updateVendor(req, res){
    try{
        const vendor = await vendorSchema.findById(req.params.id);
        if(!vendor){
            throw res.status(404).json({error: 'user not found'})
        }
        const {name, age, email} = req.body;
        const vendorQuery = {};
        if(name){
            vendorQuery['name'] = name;
        }
        if(age){
            vendorQuery['age'] = age;
        }
        if(email){
            vendorQuery['email'] = email;
        }
        
        const updateVendor = await vendorSchema.findByIdAndUpdate(vendor._id, {$set: vendorQuery}, {new: true}).populate('products')

        if(!updateVendor){
            throw res.status(404).json({error: 'vendor not updated'})
        }
        res.json({message: 'updated successfully', updateVendor})
    }
    catch(error){
       res.status(400).json({error: error.message})
   }
}

async function deleteVendor(req,res) {
    const {id} = req.params;
   try { 
      const deleteData = await vendorSchema.findById(id); 
      if(!deleteData){
          throw res.status(404).json({error: 'Vendor not found'})
      }
      const deleted = await vendorSchema.findOneAndDelete({_id: id});
      res.json({id: deleted._id});
   }
   catch(error){
       res.status(400).json({error: error.message})
   }
}

async function addProduct(req,res) {
    try { 
        const {id} = req.params;
        const {product_id} = req.body;
        const vendor = await vendorSchema.findById(id);
        if(!vendor){
            throw res.status(404).json({error: 'Vendor not found'})
        }
        const product = await productSchema.findById(product_id);
        if(!product){
            throw res.status(404).json({error: 'Product not found'})
        }
        const vendorQuery = { $addToSet: { products: product_id }};
        const vendorUpdate = await vendorSchema.findOneAndUpdate({_id: id}, vendorQuery, {new: true}).populate('products').exec();
        if(!vendorUpdate){
            throw res.status(500).json({error: 'unable to update vendor'})
        }
        const productQuery = {$addToSet: { vendors: id }};
        const productUpdate = await productSchema.findOneAndUpdate({_id: product_id}, productQuery, {new: true}).populate('vendors').exec();
        if(!productUpdate){
            throw res.status(500).json({error: 'unable to update product'})
        }
        res.json({message: 'added successfully', vendorUpdate, productUpdate})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
} 

async function removeProduct(req,res) {
    try { 
        const {id, product_id} = req.params;
        const vendor = await vendorSchema.findById(id);
        if(!vendor){
            throw res.status(404).json({error: 'Vendor not found'})
        }
        const product = await productSchema.findById(product_id);
        if(!product){
            throw res.status(404).json({error: 'Product not found'})
        }
        const vendorQuery = { $pull: { products: product_id }};
        const vendorUpdate = await vendorSchema.findOneAndUpdate({_id: id}, vendorQuery, {new: true}).populate('products').exec();
        if(!vendorUpdate){
            throw res.status(500).json({error: 'unable to remove from vendor'})
        }
        const productQuery = { $pull: { vendors: id }};
        const productUpdate = await vendorSchema.findOneAndUpdate({_id: product_id}, productQuery, {new: true}).populate('products').exec();
        if(!productUpdate){
            throw res.status(500).json({error: 'unable to remove from product'})
        }
        res.json({message: 'removed successfully', vendorUpdate, productUpdate})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
} 

module.exports = {getVendor, getOneVendor, addVendor, updateVendor, deleteVendor, addProduct, removeProduct}