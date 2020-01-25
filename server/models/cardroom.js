const mongoose = require("mongoose");

const CardroomSchema = new mongoose.Schema({
  title: String,
  description: String,
  creator_id: String,
  host: {username: String, name: String},
  cardroom_id: String,
  players: Array,
  rules: {type: Object, default: {numDecks: 1, jokers: false, maxPlayers: 8}}, // this will be implented once rules are incorpoated
});

// compile model from schema
module.exports = mongoose.model("cardroom", CardroomSchema);
