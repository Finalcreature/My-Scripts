const express = require('express')
const app = express();

app.set('view engine', 'ejs')

app.listen(3000, () =>
{
    console.log('Listening on port 3000')
})


app.get('/' ,(req,res) =>{
    res.render('home.ejs')
})

app.get('/search' ,(req,res) =>{
    const {q} = req.query
    if(!q)
    {
        res.send('Nothing was searched')
    }
    res.send(q)
})

app.get('/:Path', (req,res)=>{
    const {Path} = req.params
    res.send(`This is ${Path}`)
})

app.get('*', (req, res) =>
{
    res.send("page doesn't exist")
})