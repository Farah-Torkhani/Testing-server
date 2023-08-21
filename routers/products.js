const express = require('express');
const router = express.Router();
require ('dotenv/config');
const mongoose = require ('mongoose');
const { Product } = require('../models/product');
const { Category } = require('../models/category');
const api = process.env.API_URL;

router.get(`/`, async (req,res)=>{
    const productList = await Product.find().select('name image -_id');
    if(!productList){
        res.status(500).json({success: false});
    }
    res.send(productList) ;
})


router.get(`/:id`, async (req,res)=>{
    const productList = await Product.findById(req.params.id);
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

module.exports = router;