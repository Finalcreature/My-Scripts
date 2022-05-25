const mongoose = require('mongoose');
const Weapon = require('./models/weapon');
mongoose.connect('mongodb://localhost:27017/ffxivItems')
.then(() =>{
    console.log("Mongo Connected")
})
.catch(err =>{
    console.log('Mongo Connection Error')
})
const seedWeapon =[
    {
        name: 'Artemis Bow Zenith',
        damage: 1.00,
        test: false,
        props:{
            tradable: false,
            unique: true,
            sellable:false
            }
    }
]
// p.save().then(p =>{
//     console.log(p)
// })
// .catch(e => {
//     console.log(e)
// })
Weapon.insertMany(seedWeapon)
.then(res => console.log(res))
.catch(e => console.log(e))