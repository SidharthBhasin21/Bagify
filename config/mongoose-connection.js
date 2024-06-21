const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose")
const config = require("config");


mongoose
  .connect(`${config.get("MONGODB_URI")}/bagify`)
  .then(() => {
    dbgr("Connected to MongoDB");
  })
  .catch((err) => dbgr(err));


module.exports = mongoose.connection;