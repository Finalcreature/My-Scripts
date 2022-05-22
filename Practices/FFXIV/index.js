const express = require('express');
const app = express();
const Weapon = require('./models/weapon');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ffxivItems')
.then(() =>{
    console.log("Connected")
})
.catch(err =>{
    console.log('Error')
})



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')


app.listen(3000, ()=>{
    console.log("App IS LISTENING ON PORT 3000!")
})


app.get('/weapons', async (req,res) =>{
    const weapons = await Weapon.find() 
    console.log(weapons)
    res.render('index', {weapons})
})

app.get('/weapons/:id', async(req,res) =>{
    const {id} = req.params
    console.log(id)
    const chosenWeapon = await Weapon.findById(id)
    res.render(`details`, {chosenWeapon} )
    
})

app.get('/:id/edit', async (req,res)=>{
    const {id} = req.params
    const weapon = await Weapon.findById(id)
    res.render('edit',{weapon})
    
})

