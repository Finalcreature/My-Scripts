const button = document.querySelector('.newProduct');
const product = document.getElementById('f')
console.log(document.getElementById('f'))
let thing = product.cloneNode(true);
index = 0

let itemName = null


button.addEventListener('click', () =>
{
    index++
    let newProduct = document.body.insertBefore(addProduct(), button)
    newProduct.id = product.id + index;

    itemName = getItemName(newProduct)
    itemName.textContent = 'New Product'

    changePic(newProduct)
})



const addProduct = () =>
{
    const newProduct = product.cloneNode(true)
    return newProduct
}

const changePic = (prod2Change) =>
{
    let pic = getPic(prod2Change)
    let rand = [Math.floor(Math.random() * 7) + 1]
    pic.src = arrayOfProducts[rand]
}


function getPic(item)
{
    return document.body.querySelector(`#${item.id}> div > table > tbody > tr:nth-child(1) > td:nth-child(2) > a> img`)
}

function getItemName(item)
{
    return document.body.querySelector(`#${item.id}> div > table > tbody > tr:nth-child(1) > td:nth-child(3) > div > div > div:nth-child(1)`)
}


