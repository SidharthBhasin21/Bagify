const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/bagify")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));


module.exports = mongoose.connection;