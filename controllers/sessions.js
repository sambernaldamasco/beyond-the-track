//==========================
// DEPENDENCIES
//==========================
// -- express server
const express = require("express");

//-- adding the router
const router = express.Router();

// -- adding the db collection
const User = require("../models/users.js");

const Team = require("../models/teams.js");


// -- bcrypt
const bcrypt = require("bcrypt");

//=====================
//  ROUTES
//=====================
router.get('/new', (req, res) => {
  Team.find({}, (error, allTeams) => {
    res.render('sessions/new.ejs',
    {
      teams:allTeams
    })
  })
})

router.get("/accessdenied", (req, res) => {
  res.render("sessions/accessdenied.ejs");
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
});


router.post("/", (req, res) => {
  User.findOne({ teamId: req.body.teamId, username: req.body.username }, (error, foundUser) => {

      if (foundUser === null) {
        res.redirect("/sessions/new");
      } else {
        //checking if the pw is a good guess(a match) with bcrypt
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          req.session.username = foundUser.username;
          req.session.teamId = req.body.teamId
          console.log(req.session.teamId);
          res.redirect("/");
        } else {
          res.redirect("/sessions/new");
        }
      }
    })
})

module.exports = router;
