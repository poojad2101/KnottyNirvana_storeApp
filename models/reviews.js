// const mongoose = require("./connection")

// const { Schema, model } = mongoose;


///make reviews schema
// const reviewsSchema = new Schema 

//     const reviewSchema = new Schema({
//         content: String,
//         rating: {type: Number, min: 1, max: 5, default: 5}
//       }, {
//         timestamps: true
//       });
      
// //make reviews model
// const Review = model('Review', reviewsSchema)

// //export the connection

// module.exports = Review;

// function create(req, res) {
//   Product.findById(req.params.id, function(err, product) {
//     // We can push subdocs into Mongoose arrays
//     product.reviews.push(req.body);
//     // Save any changes made to the movie doc
//     product.save(function(err) {
//       // Step 5:  Respond to the Request (redirect if data has been changed)
//       res.redirect(`/products/${product._id}`);
//     });
//   });
// }