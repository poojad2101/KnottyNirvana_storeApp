///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connection");
const Product = require("./product");

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// save the connection in a variable
const db = mongoose.connection;

// Make sure code is not run till connected
db.on("open", () => {
    ///////////////////////////////////////////////
    // Write your Seed Code Below
    //////////////////////////////////////////////

    // router.get("/seed", (req, res) => {
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
    ];

    Product.deleteMany({})
        .then((deletedProducts) => {
            Product.create(newProducts).
                then((freshProducts) => {
                    console.log(freshProducts);
                    db.close();
                });

            })

        .catch((error) => {
                console.log(error);
                db.close();
            ;

});

    })
      .catch ((error) => {
    console.log(error);
    db.close();
})
