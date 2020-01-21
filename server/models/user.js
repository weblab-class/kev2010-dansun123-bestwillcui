const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  username: {type: String, default: 'cardmaster'}
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
