const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  username: {type: String, default: "guest"},
  profile: {type: String, default: ""},
  games: {type: Array, default: []},
  image: {type: String, default: ''},
  room: {type: String, default: "Lobby"}
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
