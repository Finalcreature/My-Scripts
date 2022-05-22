const express = require('express');
const app = express();
const path = require('path');
const {v4 : uuid} = require('uuid')

const methodOvveride = require('method-override')


const wineries = require('./data/winery.json')
let comments = require('./data/commentsDB.json');
const { url } = require('inspector');


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))
// app.use(express.json)

app.use(methodOvveride('_method'))




app.listen(3000, () =>
{
    console.log('Listening on port 3000')
})


app.get('/' ,(req,res) =>{
    res.render('home')
})

app.get('/form' ,(req,res) =>{
    res.render('form')
})

app.get('/wine' ,(req,res) =>{
    const data = wineries.branches
    res.render('wineries',{branches : data})
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

app.get('/comments',(req,res)=>{
   
    res.render('comments/index',comments)
})

app.get('/comments/new',(req,res)=>{
    res.render('comments/new')
})

app.post('/comments',(req,res)=>{
    const {username,comment} = req.body
    comments.comments.push({username,comment, id: uuid()})
    res.redirect('/comments')
})

app.get('/comments/:id',(req,res)=>{
   const {id} = req.params
   const comment = comments.comments.find(c => c.id == id.toString())
   
   res.render('comments/show', {comment})
})

app.get('/comments/:id/edit',(req,res)=>{
    const {id} = req.params
    const comment = comments.comments.find(c => c.id == id.toString())
    
    res.render('comments/update', {comment})
 })

app.patch('/comments/:id',(req,res)=>{
    const {id} = req.params
    const foundComment = comments.comments.find(c => c.id == id.toString())
    const newCommentText = req.body.comment
    foundComment.comment = newCommentText
    res.redirect('/comments')
})

app.delete('/comments/:id',(req,res)=>{
    const {id} = req.params
    comments.comments = comments.comments.filter(c=> c.id !==id)
    console.log(comments)
    res.redirect('/comments')
})

app.get('/people',(req,res) =>{
 
    const people = [
        george = {name : 'George', Age: 15},
        beni = {name : 'Beni', Age: 80},
        miriam = {name : 'Miriam', Age: 17}
    ]
    res.render('people',{people})
})

app.post('/people',(req,res) =>{
 const {name, age} = req.body
 const person = {name,age}
    const people = [ person  ]
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

