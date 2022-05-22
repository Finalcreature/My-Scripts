const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/moviesDB')
.then(() =>{
    console.log("Connected")
})
.catch(err =>{
    console.log('Error')
})

// console.log(mongoose.Connection.name)


const movieSchema = new mongoose.Schema({
    title : String,
    year: Number,
    score: Number,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema)

// const jurrasicPark = new Movie({title: 'Jurrasic Park', year: 1999, score: 9.0, rating: 'R' })


// Movie.insertMany([
//     {title : 'Alice in Wonderland', year : 1951, score: 7.4, rating: 'G'},
//     {title : 'American Psycho', year : 2000, score: 6.4, rating: 'R'},
//     {title : 'The Thing', year : 1982, score: 5.7, rating: 'R'},
//     {title : 'Jaws ', year : 1975, score: 8.7, rating: 'PG'},
//     {title : 'Pulp Fiction', year : 1994, score: 9.4, rating: 'R'}
// ])
// .then(data =>{
//     console.log(data)
// })

// document.querySelector('button').addEventListener('click', function (){
//     alert("Button was clicked")
// })

// const colorChanger = document.querySelector('select')

// console.dir(document.body.style)

// document.querySelector('select').addEventListener('input', function(){
//     if(colorChanger.value == "blue")
//     {
//         document.body.style.backgroundColor = "blue"
//     }
//     else  if(colorChanger.value == "yellow")
//     {
//         document.body.style.backgroundColor = "yellow"
//     }
    
//     else
//     {
//         document.body.style.backgroundColor = "white"
//     }
// })