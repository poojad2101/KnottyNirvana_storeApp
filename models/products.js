//Import dependencies
const mongoose = require("./connection");


// our models

const { Schema, model } = mongoose;




const reviewSchema = new Schema({
    content: String,
    rating: {type: Number, min: 1, max: 5, default: 5}
  }, {
    timestamps: true
  });
  

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
    },

    reviews: [reviewSchema]
}, {
    timestamps: true
});






//Make product model
const Product = model('Product', productsSchema)


//Export the connection

module.exports = Product;