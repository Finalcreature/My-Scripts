const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const axios = require("axios");
const ejsMate = require("ejs-mate");

app.engine("ejs", ejsMate);

//Delete later
const item = require("./seeds");

const Weapon = require("./Models/weapons");
const { config } = require("process");
const { insertMany } = require("./Models/weapons");

mongoose
  .connect("mongodb://localhost:27017/ffxivItems")
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Error");
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.use(express.static("src"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/weapons", async (req, res) => {
  const weapons = await Weapon.find();
  res.render("weapons", { weapons });
});

app.get("/weapons/:id", async (req, res) => {
  const { id } = req.params;
  const weapon = await Weapon.findById(id);
  res.render("show", { weapon });
});

function wrapAsync(fn) {
  return function (res, req, next) {
    fn(res, req, next).catch((e) => next(e));
  };
}

app.delete(
  "/weapons/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const weapon = await Weapon.findOneAndDelete(id);
    console.log(weapon);
    res.redirect("/");
  })
);

app.get("/newItem", async (req, res, next) => {
  try {
    const seed = Math.floor(Math.random() * 4000) + 1;
    const config = {
      params: {
        private_key:
          "603ccdcbe99d43ebb67da74b5d74a5d97a4a2516eb2e4980b8f97cd989de31b3",
        filters: "LevelItem > 35",
      },
    };
    let newItem = await axios
      .get(`https://xivapi.com/item/${seed}`, config)
      .then((res) => res.data);
    const { Name, DamagePhys, Description } = newItem;
    console.log(newItem.LevelItem);
    newItem = new Weapon({ Name, DamagePhys, Description });
    // newItem.save();
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});

app.get("/search", async (req, res, next) => {
  const config = {
    params: {
      private_key:
        "603ccdcbe99d43ebb67da74b5d74a5d97a4a2516eb2e4980b8f97cd989de31b3",
      indexes: "item",
      Columns: "Name,DamagePhys,Icon",
      string: "Curtana",
    },
  };
  let searchedItem = await axios
    .get("https://xivapi.com/search", config)
    .then((res) => res.data);
  const { Results: results } = searchedItem;
  // for (let i of results) {
  //   new Weapon(i).save();
  // }
  res.redirect("/");
});

app.get("/Items", async (req, res, next) => {
  try {
    const config = {
      params: {
        private_key:
          "603ccdcbe99d43ebb67da74b5d74a5d97a4a2516eb2e4980b8f97cd989de31b3",
      },
    };
    const item = await axios
      .get("https://xivapi.com/item/1675", config)
      .then((res) => res.data);

    res.render("items", { item });
  } catch (e) {
    next(e);
  }
});

app.get("/edit/:id", async (req, res, next) => {
  const { id } = req.params;
  const weapon = await Weapon.findById(id);
  res.render("edit", { weapon });
});

app.listen(3000, () => {
  console.log("App IS LISTENING ON PORT 3000!");
});
