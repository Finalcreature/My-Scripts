const mongoose = require('mongoose');
const Product = require('./Models/product')

mongoose.connect('mongodb://localhost:27017/farmStand')
.then(() =>{
    console.log("Mongo Connected")
})
.catch(err =>{
    console.log('Mongo Connection Error')
})

// const seedProduct =[
//     {
//         name: 'Eggplant',
//         price: 1.00,
//         category: 'vegetable'
//     },
//     {
//         name: 'Melon',
//         price: 4.99,
//         category: 'fruit'
//     },
//     {
//         name: 'Celery',
//         price: 1.50,
//         category: 'vegetable'
//     },
//     {
//         name: 'Chocolate Whole Milk',
//         price: 2.69,
//         category: 'dairy'
//     }
// ]
// p.save().then(p =>{
//     console.log(p)
// })
// .catch(e => {
//     console.log(e)
// })

// Product.insertMany(seedProduct)
// .then(res => console.log(res))
// .catch(e => console.log(e))