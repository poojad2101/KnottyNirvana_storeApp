//Import dependencies

const express = require("express");
const Review = require("../models/reviews");

////////////////////////////////////////////
// Create route
////////////////////////////////////////////
const router = express.Router()

////////////////////////////////////////////
// Routes
////////////////////////////////////////////

//Index Route

router.get("/", async (req, res) => {
    const reviews = await Review.find();
    res.render("reviews/index.liquid", { reviews });
});

//create Route
router.post("/", (req, res) => {

    Review.create(req.body)
        .then((products) => {
            console.log(reviews)
            res.redirect("/reviews");
        })
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
})


// new route
router.get("/new", (req, res) => {
    res.render("reviews/new");
});


// edit route
router.get("/:id/edit", (req, res) => {

    const id = req.params.id;

    Review.findById(id)
        .then((review) => {

            res.render("reviews/edit.liquid", { review });
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
    Review.findById(id)
        .then((review) => {
            // render the template with the data from the database
            res.render("reviews/show.liquid", { review });
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

    Review.findByIdAndUpdate(id, req.body, { new: true })
        .then((review) => {
            // redirect to main page after updating
            res.redirect("/reviews");
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
    Review.findByIdAndRemove(id)
        .then((review) => {
            // redirect to main page after deleting
            res.redirect("/reviews");
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});




///// Export the Router
 module.exports = router;