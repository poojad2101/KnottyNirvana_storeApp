//Import dependencies

const express = require("express");
const Product = require("../models/products");

////////////////////////////////////////////
// Create route
////////////////////////////////////////////
const router = express.Router()

////////////////////////////////////////////
// Routes
////////////////////////////////////////////



router.get("/seed", (req, res) => {
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
            qty: 2,
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

router.get("/", async (req, res) => {
    const products = await Product.find();
    res.render("products/index.liquid", { products });
});

//create Route
router.post("/", (req, res) => {

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
router.get("/new", (req, res) => {
    res.render("products/new");
});


// edit route
router.get("/:id/edit", (req, res) => {

    const id = req.params.id;

    Product.findById(id)
        .then((product) => {

            res.render("products/edit.liquid", { product });
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});


//Show Route
router.get("/:id", (req, res) => {
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

//update route
router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, { new: true })
        .then((product) => {
            // redirect to main page after updating
            res.redirect("/products");
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});

router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    Product.findByIdAndRemove(id)
        .then((product) => {
            // redirect to main page after deleting
            res.redirect("/products");
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});




///// Export the Router
 module.exports = router;