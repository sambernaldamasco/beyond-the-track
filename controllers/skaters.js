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
// -- index route
router.get("/", (req, res) => {
if (req.session.username) {
  Skater.find({}, (error, query) => {
    res.render("skaters/index.ejs", {
      skaters: query
    });
  });
} else {
  res.redirect("/sessions/accessdenied");
}

});

// -- new route
// not session protected so new skaters can add themselves for tryouts
router.get("/new", (req, res) => {
  res.render("skaters/new.ejs");
});

// -- show route
router.get("/:id", (req, res) => {
  if (req.session.username) {
    Skater.findById(req.params.id, (error, foundSkater) => {
      res.render("skaters/show.ejs", {
        skater: foundSkater
      });
    });
  } else {
    res.redirect('/sessions/accessdenied')
  }
});

// ============== POST ROUTES ==============
// -- CREATE(post) ROUTE
// posting the info from the form on the route NEW
router.post("/", (req, res) => {
  // res.send(req.body.name)
  if (req.body.veteran === "on") {
    req.body = logic.dataManipulation.veteranSkater(req.body);
  }
  // res.send(req.body)
  Skater.create(req.body, (error, createdSkater) => {
    res.redirect('/');
  });
});

// ============== DESTROY ROUTES ==============
// it takes the ID from the url send in the form+submit button
router.delete("/:id", (req, res) => {
  Skater.findByIdAndRemove(req.params.id, (error, deletedData) => {
    res.redirect("/skaters");
  });
});

module.exports = router;
