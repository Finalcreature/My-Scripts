
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ffxivItems')
.then(() =>{
    console.log("Connected")
})
.catch(err =>{
    console.log('Error')
})

const productSchema = new mongoose.Schema(
    {
        name:{
            type :  String,
            required : true
        },
        damage : {
            type: Number,
            min: 0
        },
        autoAttack: {
            type: Number
        },
        image: {
            type : String,
            require : true
        },
        props: 
        {
            tradable: {
                type: Boolean,
                default: true
            },
            unique: {
                type: Boolean,
                default: false
            },
            sellable: {
                type: Boolean,
                default: true
            }
        }
    }
)

productSchema.methods.showDamage = function () {
    console.log(this.damage)
}

productSchema.methods.increaseDamageBy = function (num) {
    this.damage += num
    console.log(this.damage)
}

// productSchema.methods.findItem = async () => {
//     const foundItem = await Item.findOne({name: 'Curtana Zenith'})
//     foundItem.showDamage()
// }



productSchema.statics.findAll = function () {
     
    return this.find().then(res => console.log(res))
}

productSchema.statics.findCurtana = function () {
    
    return this.find({name: 'Curtana Zenith'}).then(i => console.log(i))
}


productSchema.virtual('uniquness').get(function (){
    if(this.props.unique)
    {
        return `${this.name} is a unique item`
    }
    else
    {
        return `${this.name} is a common item`
    }
}).set(function(bool){
    this.props.unique = bool
})

productSchema.virtual('tradeAndSale').get(function (){
        
    return `Tradable is ${this.props.tradable} and sellabe is also ${this.props.sellable}`
}).set(function (bool){
    
    this.props.tradable = bool
    this.props.sellable = !bool

})

productSchema.pre('find', function(){
    console.log('You are now looking for:')
})

// }).set(function(bool){
//     this.props.unique = bool
// })

// productSchema.virtual('makeCommon').set(function (){
//     if(this.props.unique)
//     {
//         this.props.unique = false
//     }
// })



const Item = mongoose.model('Item', productSchema)



const sword = new Item({name : 'Sword', damage: 10})

const uniqueBow = new Item({name : 'Unique Bow', damage: 25, props:{tradable: false, unique : true, sellable: false}})




// Item.findOneAndUpdate({damage: 83}, {damage: -1}, {new:true, runValidators: true}).then(data =>{
//         console.log("Worked")
//         console.log(data)
//     }).catch(err=> {
//         console.log('Error')
//         console.log(err)
//     })

// const artemisBowZentih = new Item({name : 'Artemis Bow Zenith', damage: 61, autoAttack: 66.69, image: 'https://garlandtools.org/files/icons/item/32238.png'})
// artemisBowZentih.save().then(data =>{
//     console.log("Worked")
//     console.log(data)
// }).catch(err=> {
//     console.log('Error')
//     console.log(err)
// })

// const curtanaZentih = new Item({name : 'Curtana Zenith', damage: 61, autoAttack: 47.17, image: 'https://garlandtools.org/files/icons/item/30446.png', tradable: false, unique: true, sellable: false})
// curtanaZentih.save().then(data =>{
//     console.log("Worked")
//     console.log(data)
// }).catch(err=> {
//     console.log('Error')
//     console.log(err)
// })

// const applewoodSpear = new Item({name : 'Applewood Spear', damage: 83, autoAttack: 77.46, image: 'https://garlandtools.org/files/icons/item/31982.png'})
// applewoodSpear.save().then(data =>{
//     console.log("Worked")
//     console.log(data)
// }).catch(err=> {
//     console.log('Error')
//     console.log(err)
// })