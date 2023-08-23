const express = require('express');
const router = express.Router();
require ('dotenv/config');
const mongoose = require ('mongoose');
const { Product } = require('../models/product');
const { Category } = require('../models/category');
const api = process.env.API_URL;


router.get(`/`, async (req,res)=>{
    const productList = await Product.find().select('name image -_id category').populate('category');
    if(!productList){
        res.status(500).json({success: false});
    }
    res.send(productList) ;
})


router.get(`/:id`, async (req,res)=>{
    const productList = await Product.findById(req.params.id).populate('category');
    if(!productList){
        res.status(500).json({success: false});
    }
    res.send(productList) ;
})

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(()=>{
    console.log('Database connection is ready')
})
.catch((err)=>{
    console.log(err);
})



router.post(`/`,async(req,res)=>{

    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid category')
const product = new Product({
     name: req.body.name,
     descreption: req.body.descreption,
     richDescription: req.body.richDescription,
     image: req.body.image,
     brand: req.body.brand,
     price: req.body.price,
     category: req.body.category,
     countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
     isFeatured: req.body.isFeatured,
    
})

if(!product)
return res.status(500).send('the product cannot be created')
    res.send(product) ;
})


router.put('/:id',async(req,res)=>{  

 const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid category')
const product = await Product.findByIdAndUpdate(req.params.id,{
     name: req.body.name,
     descreption: req.body.descreption,
     richDescription: req.body.richDescription,
     image: req.body.image,
     brand: req.body.brand,
     price: req.body.price,
     category: req.body.category,
     countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
     isFeatured: req.body.isFeatured,
    
}, { new:true}
)
if(!product){
    return res.status(500).send('the product cannot be updated!')
    }
        res.send(product);
})

router.delete('/:id', (req, res) => {
   if( !mongoose.isValidObjectId(req.params.id))
   {
return res.status(400).send('Invalid product id')
   }
    Product.findByIdAndRemove(req.params.id)
        .then(Product => {
            if (Product) {
                return res.status(200).json({ success: true, message: 'The Product is deleted' });
            } else {
                return res.status(404).json({ success: false, message: 'Product not found!' });
            }
        })
        .catch(err => {
            return res.status(400).json({ success: false, error: err });
        });
});


router.get(`/get/count`, async (req,res)=>{
    const products = await Product.countDocuments((count) => count);
    if(!products){
        res.status(500).json({success: false});
    }
    res.send(products);
});
router.get(`/get/featured`, async (req,res)=>{
    const productCount = await Product.find({isFeatured: true});
    if(!productCount){
        res.status(500).json({success: false});
    }
    res.send({productCount : productCount});
});

router.get(`/get/count`, async (req,res)=>{
    const products = await Product.countDocuments((count) => count);
    if(!products){
        res.status(500).json({success: false});
    }
    res.send(products);
});
router.get(`/get/featured/:count`, async (req,res)=>{
    const count = req.params.count ? req.params.count : 0
    const productCount = await Product.find({isFeatured: true}).limit(+count);
    if(!productCount){
        res.status(500).json({success: false});
    }
    res.send({productCount : productCount});
});



 router.get(`/`, async (req,res)=>{
    // localhost:3000/api/v1/products?categories=64e217ace2b6a73d1090b4f7,64e217ace2b6a73d1090b4f7
    let filter = {};
    if (req.query.categories)
    {
        const filter = req.query.categories.split(',')
    }

    const productList = await Product.find({category: filter}).populate('category');




    if(!productList){
        res.status(500).json({success: false});
    }
    res.send(productList) ;
})

module.exports = router;