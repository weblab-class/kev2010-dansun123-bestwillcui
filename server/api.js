/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Cardroom = require("./models/cardroom")
const Message = require("./models/message")

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|



router.get("/cardrooms", (req, res) => {
  console.log(req.body.name)
  // res.send(['balh'])
  Cardroom.find({}).then((cardrooms) => {
    res.send(cardrooms);
  });
});

router.get("/cardroom", (req, res) => {
  console.log(req.body.cardroom_id)
  Cardroom.find({cardroom_id: req.body.cardroom_id}).then((cardroom) => {
    res.send(cardroom)
  })
})

router.post("/cardroom", (req, res) => {
  const newCardroom = new Cardroom({
    title: req.body.title,
    description: req.body.description,
    creator_id: req.body.creator_id,
    host: {username: req.body.username, name: req.body.name},
    cardroom_id: req.body.creator_id+req.body.title,
    players: [{username: req.body.username, name: req.body.name, id: req.body.creator_id}],
  }) 
  newCardroom.save().then((cardroom) => res.send(cardroom))
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.get("/tester", (req, res) => {
  res.send({test:"TEST"})
})

router.post("/username", (req, res) => {
  User.findById(req.body.userId).then((user) => {
    user.username = req.body.username;
    user.save();
    res.send({ username: user.username });
  });
});

router.post("/profile", (req, res) => {
  User.findById(req.body.userId).then((user) => {
    user.profile = req.body.profile;
    user.save();
    res.send({ profile: user.profile });
  });
});

router.post("/image", (req, res) => {
  User.findById(req.body.userId).then((user) => {
    user.image = req.body.image;
    user.save();
    res.send({ image: user.image });
  });
});

router.get("/chat", (req, res) => {
  let query;
  if (req.query.recipient_id === "ALL_CHAT") {
    // get any message sent by anybody to ALL_CHAT
    query = { "recipient._id": "ALL_CHAT" };
  } else {
    // get messages that are from me->you OR you->me
    query = {
      $or: [
        { "sender._id": req.user._id, "recipient._id": req.query.recipient_id },
        { "sender._id": req.query.recipient_id, "recipient._id": req.user._id },
      ],
    };
  }

  Message.find(query).then((messages) => res.send(messages));
});

router.post("/message", auth.ensureLoggedIn, (req, res) => {
  console.log(`Received a chat message from ${req.user.name}: ${req.body.content}`);

  // insert this message into the database
  const message = new Message({
    recipient: req.body.recipient,
    sender: {
      _id: req.user._id,
      name: req.user.name,
    },
    content: req.body.content,
  });
  message.save();

  if (req.body.recipient._id == "ALL_CHAT") {
    socket.getIo().emit("message", message);
  } else {
    socket.getSocketFromUserID(req.body.recipient._id).emit("message", message);
    socket.getSocketFromUserID(req.user._id).emit("message", message);
  }
});

router.get("/activeUsers", (req, res) => {
  res.send({ activeUsers: socket.getAllConnectedUsers() });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
