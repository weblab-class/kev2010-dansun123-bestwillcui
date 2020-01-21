const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  title: String,
  creator_name: String,
});

// compile model from schema
module.exports = mongoose.model("game", GameSchema);
