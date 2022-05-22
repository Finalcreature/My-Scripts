const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverried = require('method-override')

const Product = require('./Models/product');

const { Console } = require('console');

mongoose.connect('mongodb://localhost:27017/farmStand')
.then(() =>{
    console.log("Mongo Connected")
})
.catch(err =>{
    console.log('Mongo Connection Error')
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(methodOverried('_method'))

app.listen(3000, ()=>{
    console.log("App IS LISTENING ON PORT 3000!")
})


//variables

const categories = ['fruit','vegetable', 'dairy']






//routes

app.get('/products', async (req,res) =>{
    const products = await Product.find({})
    res.render('products/index', {products})
}) 

app.get('/products/new', (req,res) =>{
    res.render('products/new', {categories})
}) 

app.get('/products/:id/edit', async (req,res) =>{
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/edit', {product, categories})
}) 

app.put('/products/:id', async (req, res) =>{
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    res.redirect(`/products/${product._id}`)
})

app.post('/products', async (req,res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    console.log(newProduct)
    res.redirect(`/products/${newProduct._id}`)
})


app.get('/products/:id', async (req,res) =>{
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/show', {product})
}) 

app.delete('/products/:id', async (req,res) =>{
    const {id} = req.params
    await Product.findByIdAndDelete(req.params.id)
    res.redirect('/products')
})


