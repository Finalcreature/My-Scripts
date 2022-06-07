const mongoose = require("mongoose");
const weaponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  damage: {
    type: Number,
    required: true,
  },
});

const Weapon = mongoose.model("Weapon", weaponSchema);
module.exports = Weapon;
