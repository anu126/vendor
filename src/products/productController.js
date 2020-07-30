const productSchema = require('./productModel');

async function getProduct(req,res) {
    try{
        const products = await productSchema.find();
        if(!products){
            return res.status(400).json({error: "no product found"})
        }
        return res.status(200).json({products: products})
    }
    catch(error){
        return res.status(400).json({error: error.message})
    }
}

async function getOneProduct(req,res) {
    try{
        const product = await productSchema.findById(req.params.id)
        if(!product){
            return res.status(400).json({error: "no product found"})
        }
        else{
            return res.status(200).json(product)
        }
     }
     catch(error){
        return res.status(400).json({error: error.message})
    }
}

async function createProduct(req,res) {
    try { 
        const postProduct = await new productSchema({
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_description: req.body.product_description
        });
        const saveProduct = await postProduct.save();
        if(!saveProduct){
            throw res.status(500).json({error: 'unable to update in DB'})
        }
        const product = await productSchema.findById(saveProduct._id);
        if(!product){
            throw res.status(500).json({error: 'unable to show product'})
        }
        res.json(saveProduct);
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

async function updateProduct(req, res){
    try{
        const product = await productSchema.findById(req.params.id);
        if(!product){
            throw res.status(404).json({error: 'product not found'})
        }
        const {product_name, product_price, product_description} = req.body;
        const productQuery = {};
        if(product_name){
            productQuery['name'] = product_name;
        }
        if(product_price){
            productQuery['price'] = product_price;
        }
        if(product_description){
            productQuery['description'] = product_description;
        }
        
        const updateProduct = await productSchema.findByIdAndUpdate(product._id, {$set: productQuery}, {new: true})

        if(!updateProduct){
            throw res.status(404).json({error: 'product not updated'})
        }
        res.json({message: 'updated successfully', updateProduct})
    }
    catch(error){
       res.status(400).json({error: error.message})
   }
}

async function deleteProduct(req,res) {
    const {id} = req.params;
   try { 
      const deleteData = await productSchema.findById(id); 
      if(!deleteData){
          throw res.status(404).json({error: 'product not found'})
      }
      const deleted = await productSchema.findOneAndDelete({_id: id});
      res.json({id: deleted._id});
   }
   catch(error){
       res.status(400).json({error: error.message})
   }
}

module.exports = {getProduct, getOneProduct, createProduct, updateProduct, deleteProduct}