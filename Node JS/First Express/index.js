const express = require('express')
const app = express();
const path = require('path');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.listen(3000, () =>
{
    console.log('Listening on port 3000')
})


app.get('/' ,(req,res) =>{
    res.render('home')
})

app.get('/checking',(req,res)=>{
    const {isEven,value} = checkIfNumberIsEven();
    res.render('checks',{isEven,value})
})

function checkIfNumberIsEven()
{
    const value = Math.floor(Math.random() * 10)
    const obj = {isEven : (value % 2 === 0 ? true:false), value}
    return obj
}

app.get('/people',(req,res) =>{
 
    const people = [
        george = {name : 'George', Age: 15},
         beni = {name : 'Beni', Age: 80},
         miriam = {name : 'Miriam', Age: 17}
    ]
    res.render('people',{people})
})


app.get('/search' ,(req,res) =>{
    const {q} = req.query
    if(!q)
    {
        res.send('Nothing was searched')
    }
    res.send(q)
})

app.get('/path',(req,res)=>{
    const var1 = 'var1'
    const var2 = 2
    res.render('path',{var1, num : var2})
})

app.get('/welcome',(req,res)=>{
    const name = 'Nadav'
    const num = name.length * 4
    res.render('welcome',{name, nameLength : num })
})

app.get('/:Path', (req,res)=>{
    const {Path} = req.params
    res.send(`This is ${Path}`)
})

app.get('*', (req, res) =>
{
    res.send("page doesn't exist")
})

