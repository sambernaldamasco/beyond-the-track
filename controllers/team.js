//==========================
// DEPENDENCIES
//==========================
// -- express server
const express = require("express");

//-- adding the router
const router = express.Router();

// -- db collection
const Skater = require("../models/skaters.js");

// -- app logic
const logic = require("../models/logic.js");

//=====================
//  ROUTES
//=====================
// ============== GET ROUTES ==============
// -- index
router.get("/", (req, res) => {
  if (req.session.username) {
    Skater.find({ accepted: true }, null, (error, query) => {
      res.render("skaters/team/index.ejs", {
        skaters: query
      });
    });
  } else {
    res.redirect("/sessions/accessdenied");
  }
});

module.exports = router;
