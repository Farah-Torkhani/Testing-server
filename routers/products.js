const express = require('express');
const router = express.Router();
require ('dotenv/config');
const mongoose = require ('mongoose');
const api = process.env.API_URL;

router.get(`${api}/products`, async (req,res)=>{
    const productList = await Product.find();
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



router.post(`${api}/products`,(req,res)=>{
const product = new Product({

    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
    
})


product.save()
    .then(createdProduct => {
        res.status(201).json(createdProduct);
    })
    .catch(err => {
        res.status(500).json({
            error: err,
            success: false
        });
    });

console.log(product);
    res.send(product) ;
})

module.exports = router;