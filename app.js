const express =  require ('express');
const app = express();
const bodyParser =  require ('body-parser');
const morgan = require('morgan');
require ('dotenv/config');
const mongoose = require ('mongoose');
//midleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

const productSchema = mongoose.Schema({

    name: String,
    image: String,
    countInStock: Number
})

const Product = mongoose.model('Product', productSchema);

const api = process.env.API_URL;



app.get(`${api}/products`,(req,res)=>{
const product = {
    id: 1,
    name: 'hair dresser',
    image: 'some_url',
}
    res.send(product) ;
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

app.post(`${api}/products`,(req,res)=>{
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

app.listen(3000, ()=>{

    console.log('server is running http://localhost:3000')
})