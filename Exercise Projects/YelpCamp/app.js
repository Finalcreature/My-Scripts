const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const Campground = require("./models/campground");
const methodOverride = require("method-override");
const morgan = require("morgan");
const ejsMate = require("ejs-mate");
const AppError = require("./AppError");
const res = require("express/lib/response");
const { brotliCompress } = require("zlib");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(morgan("tiny"));

app.use((req, res, next) => {
  req.requestTme = Date.now();
  console.log(req.method.toUpperCase(), req.path, req.requestTme);
  next();
});

app.use("/campgrounds", (req, res, next) => {
  console.log("All Campgrounds");
  next();
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get(
  "/campgrounds",
  wrapAsync(async (req, res) => {
    const campgrounds = await Campground.find();
    res.render("campgrounds/index", { campgrounds });
  })
);

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

app.post(
  "/campgrounds",
  wrapAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.get(
  "/campgrounds/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render("campgrounds/edit", { campground });
  })
);

app.get(
  "/campgrounds/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render(`campgrounds/show`, { campground });
  })
);

app.put(
  "/campgrounds/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body });
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.delete(
  "/campgrounds/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndRemove(id);
    res.redirect("/campgrounds");
  })
);

// app.use((req, res) => {
//   res.status(404).send("Not found");
// });

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("Port 3000");
});
