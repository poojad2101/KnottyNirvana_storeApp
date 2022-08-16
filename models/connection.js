
//import our dependencies
require("dotenv").config();
const mongoose = require("mongoose");


const MONGODB_URI = process.env.MONGODB_URI;
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

//Establish Connection
mongoose.connect(MONGODB_URI, CONFIG);

mongoose.connection
    .on("open", () => console.log("Connected to Mongoose" + MONGODB_URI))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log(error));

//Export the connection

module.exports = mongoose;