const mongoose = require("./connection")

const { Schema, model } = mongoose;


///make reviews schema
const reviewsSchema = new Schema 

    const reviewSchema = new Schema({
        content: String,
        rating: {type: Number, min: 1, max: 5, default: 5}
      }, {
        timestamps: true
      });
      
//make reviews model
const Review = model('Review', reviewsSchema)

//export the connection

module.exports = Review;