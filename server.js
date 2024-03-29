//Import dependencies

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");
const mongoose = require("./models/connection");
const Product = require("./models/products")
const ProductRouter = require("./controllers/product");
const ReviewRouter = require("./controllers/review");
const UserRouter = require("./controllers/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");







/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), { root: [path.resolve(__dirname, 'views/')] })

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
// middleware to setup session
app.use(
    session({
      secret: process.env.SECRET,
      store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
      saveUninitialized: true,
      resave: false,
    })
  );
  

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.use("/products", ProductRouter);
app.use("/", ReviewRouter);
app.use("/user", UserRouter);

app.get("/", (req, res) => {
    res.render("index.liquid");
});


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(process.env.PORT || 3000)

