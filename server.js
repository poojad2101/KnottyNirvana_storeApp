require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");
const { stringify } = require("querystring");


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

const { Schema, model } = mongoose;

//Make productsSchema
const productsSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    image: String,


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
app.get("/", (req, res) => {
    res.send("your server is running... better catch it.");
});

app.get("/products/seed", (req, res) => {
    const newProducts = [
        {
            title: "Handmade multicolor lacy summer crochet top blouse",
            image: "https://i.etsystatic.com/25901164/r/il/342f6d/3266146076/il_1588xN.3266146076_d6qs.jpg",
            price: 44,
            qty: 1,
        },
        {
            title: "Womens handmade crochet spring/fall bohemian turtleneck scarf/wrap, beige scarf",
            image: "https://i.etsystatic.com/25901164/r/il/d8c0d4/2968735721/il_1588xN.2968735721_hsze.jpg",
            price: 50,
            qty: 5,

        },
        {
            title: "Crochet handmade multicolor chunky warm beanie hat",
            image: "https://i.etsystatic.com/25901164/r/il/e3a84c/2733061992/il_1588xN.2733061992_obro.jpg",
            price: 25,
            qty: 3,
        },
        {
            title: "warm crochet slipper winter multicolor slipper booties",
            image: "https://i.etsystatic.com/25901164/r/il/2e4715/2769120600/il_340x270.2769120600_bqfp.jpg",
            price: 30,
            qty: 7,

        },
        {
            title: "crochet beaded pink top",
            image: "https://i.etsystatic.com/25901164/c/2250/1786/0/102/il/dbb8d7/2830751084/il_340x270.2830751084_rbyn.jpg",
            price: 70,
            qty: 2
        },
        {
            title: "Toddler layered dress kids spring summer dress",
            image: "https://i.etsystatic.com/25901164/r/il/bffcdc/2792237178/il_340x270.2792237178_9c29.jpg",
            price: 40,
            qty: 5

        },
    ]

    Product.deleteMany({}).then((data) => {
        Product.create(newProducts).then((data) => {
            res.json(data);
        });

    });

});

//Index Route
app.get("/products", async (req, res) => {
    const products = await Product.find();
    res.render("products/index.liquid", { products });
});

// create route
// app.post("/products/create", (req, res) => {



app.post('/products/', (req, res) => {
    //     Product.push(req.body)
    //     res.redirect('/products')
    Product.create(req.body)
        .then((products) => {
            console.log(products)
            res.redirect("/products");
        })
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
})





// new route
app.get("/products/new", (req, res) => {
    res.render("products/new");
});




//Show Route
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    Product.findById(id)
        .then((product) => {
            // render the template with the data from the database
            res.render("products/show.liquid", { product });
        })
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
})


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));