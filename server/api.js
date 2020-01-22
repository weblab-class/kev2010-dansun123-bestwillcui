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
const Game = require("./models/game")

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


router.get("/games", (req, res) => {
  Game.find({}).then((games) => {
    res.send(games);
  });
});

router.post("/games", (req, res) => {
  const newGame = new Game({
    title: req.body.content,
    creator_name: req.user.name,
  }) 
  newGame.save().then((game) => res.send(game))
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

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

// router.post("/games", (req, res) => {
//   User.findById(req.body.userId).then((user) => {
//     user.games: user.games.push(new Game());
//     user.save();
//     res.send({ username: user.username });
//   });
// });


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
