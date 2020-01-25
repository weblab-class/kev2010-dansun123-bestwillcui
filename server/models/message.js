const mongoose = require("mongoose");

//define a message schema for the database
const MessageSchema = new mongoose.Schema({
    content: String,
    sender: {
        _id: String,
        username: String,
        name: String,
    },
    recipient: {
        _id: String,
        username: String,
        name: String,
    },
    timestamp: {type: Date, default: Date.now}
});

// compile model from schema
module.exports = mongoose.model("message", MessageSchema);