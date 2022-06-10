const mongoose = require("mongoose");
const weaponSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  DamagePhys: {
    type: Number,
    required: true,
  },
  Description: {
    type: String,
    default: "No description",
  },
  Icon: {
    type: String,
  },
});

const Weapon = mongoose.model("Weapon", weaponSchema);
module.exports = Weapon;
