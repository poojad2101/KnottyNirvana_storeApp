require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path")


const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

//Establish Connection
mongoose.connect(DATABASE_URL, CONFIG);

mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error));


// const Schema = mongoose.Schema
// const model = mongoose.model

const {Schema, model } = mongoose;

//Make productsSchema
const productsSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    img: String,

    price: {
        type: Number,
        min: 0
    },
    qty: {
        type: Number,
        min: 0
    }
})
//Make product model
const Product = model('Product', productsSchema)


/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})

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
app.get("/", (req, res) => {
  res.send("your server is running... better catch it.");
});

app.get("/products/seed", (req, res) => {
    const newProducts = [
        {
            title : "Handmade multicolor lacy summer crochet top blouse",
            img : "https://i.etsystatic.com/25901164/r/il/342f6d/3266146076/il_1588xN.3266146076_d6qs.jpg",
            price : 44,
            quantity : 1,
        },
        {
            title : "Womens handmade crochet spring/fall bohemian turtleneck scarf/wrap, beige scarf",
            img : "https://i.etsystatic.com/25901164/r/il/d8c0d4/2968735721/il_1588xN.2968735721_hsze.jpg",
            price : 50,
            quantity : 5,

        },
        {
            title : "Crochet handmade multicolor chunky warm beanie hat",
            img : "https://i.etsystatic.com/25901164/r/il/e3a84c/2733061992/il_1588xN.2733061992_obro.jpg",
            price : 25,
            quantity : 3,
        },
    ]
    
    Product.deleteMany({}).then((data) => {
        Product.create(newProducts).then((data) => {
          res.json(data);
});

    });

});

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));