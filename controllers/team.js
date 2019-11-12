//==========================
// DEPENDENCIES
//==========================
// -- express server
const express = require("express");

//-- adding the router
const router = express.Router();

// -- db collection
const Skater = require("../models/skaters.js");

// -- db collection
const Team = require("../models/teams.js");

// -- app logic
const logic = require("../models/logic.js");

//=====================
//  ROUTES
//=====================
// ============== GET ROUTES ==============
// -- index
router.get("/", (req, res) => {
  if (req.session.username) {
    Skater.find({ teamId: req.session.teamId, accepted:true }, (error, foundSkaters) => {
      console.log(foundSkaters);
      // res.send(query)
      res.render("teams/index.ejs", {
        skaters: foundSkaters
      });
    });
  } else {
    res.redirect("/sessions/accessdenied");
  }
});

router.get('/new', (req, res) => {
  res.render("teams/new.ejs")
})


// ============== POST ROUTES ==============
router.post('/', (req, res) => {
  // res.send(req.body)
  Team.create(req.body, (error, createdTeam) => {
    res.redirect('/')
    // console.log(error);
  })
})
module.exports = router;
