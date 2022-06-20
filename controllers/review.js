//Import dependencies

const express = require("express");
const Product = require("../models/products")

////////////////////////////////////////////
// Create route
const router = express.Router()
////////////////////////////////////////////

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
router.post("/products/:id/reviews", (req, res) => {
    Product.findById(req.params.id, (error, product) => {
        product.reviews.push(req.body);
        console.log(product)
        product.save((error) => {
            res.redirect(`/products/${product._id}`);
        });
    });
})






//Index Route

router.get("/", async (req, res) => {
    const reviews = await Product.find();
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
router.get("/:id/new", (req, res) => {
    Product.findById(req.params.id)
        .then((product) => {
            res.render("reviews/new", {
                product
            });
        })

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
    Product.findById(id)
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


//delete
router.delete("/:productId/:reviewId", (req, res) => {
    console.log('HI');
    const productId = req.params.productId
    console.log('productid', productId);
    const reviewId = req.params.reviewId
    console.log('review', reviewId);
    Product.findById(productId)
      
      .then(product => {
        console.log(product);
        const productReview = product.reviews.id(reviewId)
        if(String(productReview._id) === String(req.params.reviewId)) {
            console.log('here')
            productReview.remove()
            return product.save()
        }
        else {
            return
        }
        
      })
      .then(product => {
            res.redirect(`/products/${productId}`);
      })
    
});

//edit
router.get("/:id/:reviewId/reviews/edit", (req, res) => {
    Product.findById(req.params.id).then((product) => {
        res.render("reviews/edit.liquid", {
            product: product,
            reviewId: req.params.reviewId,
        });
    });
});



router.put("/:productId/:reviewId", (req, res) => {
    const productId = req.params.productId;
    console.log("productid", productId);
    const reviewId = req.params.reviewId;
    console.log("review", reviewId);
    Product.findById(productId)
        .then((product) => {
            console.log(product);
            const productReview = product.reviews.id(reviewId);
            if (String(productReview._id) === String(req.params.reviewId)) {
                productReview.content = req.body.content
                productReview.rating = req.body.rating
                return product.save();
            } else {
                return;
            }
        })
        .then((post) => {
            res.redirect(`/products/${productId}`);
        });
})
    
///// Export the Router
module.exports = router;