const mongoose = require("mongoose");
const Weapon = require("./Models/weapons");

const myWeapon = new Weapon({
  Name: "Another Weapon",
  DamagePhys: 10,
  Description: "Trying this one out",
});

mongoose
  .connect("mongodb://localhost:27017/ffxivItems")
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch((err) => {
    console.log("Mongo Connection Error");
  });

myWeapon
  .save()
  .then((myWeapon) => {
    console.log(myWeapon);
  })
  .catch((e) => {
    console.log(e);
  });
