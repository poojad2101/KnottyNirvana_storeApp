//Import dependencies
const mongoose = require("./connection");


// our models

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


//Export the connection

module.exports = Product;