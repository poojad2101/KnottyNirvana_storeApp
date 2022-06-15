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


//route for reviews


router.post('/products/:id/reviews', (req, res) => {

})
    

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