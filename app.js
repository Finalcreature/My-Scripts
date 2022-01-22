// const fakeRequest = async (url) =>
// {
//     return new Promise((resolve, reject) =>
//     {
//         const delay = Math.floor(Math.random() * (4500)) + 500
//         setTimeout(() =>
//         {
//             if (delay > 4000) reject('Connection Timeout')
//             else resolve(`Here is your fake data from ${url}`)
//         }, delay)
//     })

// }

// async function makeRequest()
// {
//     let data = await fakeRequest('Youtube.com')
//     console.log(data)
// }


// const form = document.querySelector('#searchForm')
// form.addEventListener('submit', async function(e){
//     e.preventDefault
//     const config = {params: {q: searchTerm}}
//     const res = await axios.get('URL/search',config)

// })

// function Constructor()
// {

// }

// Constructor.prototype.newFunc = function ()
// {
//     return console.log('Do something...')
// }

// const val = new Constructor();

// function Dog(size, breed)
// {
//     this.size = size
//     this.breed = breed
// }

// Dog.prototype.bark = function ()
// {
//     return console.log("Woof")
// }


class Pet
{
    constructor(size, breed)
    {
        this.size = size
        this.breed = breed
    }
    eat()
    {
        console.log(`A ${this.breed} is eating`)
    }
}

class Dog extends Pet
{
    constructor(size, breed, name)
    {
        super(size, breed)
        this.name = name
    }
    bark()
    {
        console.log("Woof")
    }
}

console.log("Test")




