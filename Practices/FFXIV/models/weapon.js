const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const weaponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    damage: {
        type: Number,
        required: true,
        min: 0
    },
    test:{
        type: Boolean
    },
    props:{
        tradable:{
            type : Boolean,
            default: true
        },
        unique:{
            type: Boolean,
            default: false
        },
        sellable:{
            type : Boolean,
            default: true
        }
    }
})


const Weapon = mongoose.model('Weapon', weaponSchema)
module.exports = Weapon;