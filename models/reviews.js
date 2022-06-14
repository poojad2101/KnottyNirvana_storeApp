const mongoose = require("./connection")

const { Schema, model } = mongoose;


///make reviews schema
const reviewsSchema = new schema ({
    content: String,
    username : String,
    timestamps : true,

})
//make reviews model
const Review = model('Review', reviewsSchema)

//export the connection

module.exports = Review;