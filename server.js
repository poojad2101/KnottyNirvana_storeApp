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

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.use("/products", ProductRouter);
app.use("/reviews", ReviewRouter);
app.use("/user", UserRouter);

app.get("/", (req, res) => {
    res.send("your server is running... better catch it.");
});


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));

