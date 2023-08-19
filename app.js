const express =  require ('express');
const app = express();
const bodyParser =  require ('body-parser');
const morgan = require('morgan');
require ('dotenv/config');
const api = process.env.API_URL;

const Product = require('./models/product')
const productsRouter =  require ('./routers/products')
const mongoose = require ('mongoose');
//midleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use(`${api}/products`, productsRouter);







app.listen(3000, ()=>{

    console.log('server is running http://localhost:3000')
})