//==========================
// DEPENDENCIES
//==========================
// -- express server
const express = require("express");

//-- adding the router
const router = express.Router();

// -- adding the db collection
const User = require("../models/users.js");

// -- bcrypt
const bcrypt = require("bcrypt");

//=====================
//  ROUTES
//=====================
router.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

router.get("/accessdenied", (req, res) => {
  res.render("sessions/accessdenied.ejs");
});

router.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (error, foundUser) => {
    //checking if the user was found/exists
    if (foundUser === null) {
      res.redirect("/sessions/new");
    } else {
      //checking if the pw is a good guess(a match) with bcrypt
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.username = foundUser.username;
        res.redirect("/skaters");
      } else {
        res.redirect("/sessions/new");
      }
    }
  });
});

module.exports = router;
