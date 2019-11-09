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
// -- index route redirects to skaters index page
router.get("/", (req, res) => {
  if (req.session.username) {
    Skater.find({}, (error, query) => {
      res.render("skaters/index.ejs", {
        skaters: query
      });
    });
  } else {
    res.redirect('/sessions/accessdenied')
  }

});

// ================== edit routes
// -- edit agility
router.get("/:id/agility", (req, res) => {
if (req.session.username) {
  Skater.findById(req.params.id, (error, foundSkater) => {
    res.render("skaters/skills/agility.ejs", {
      skater: foundSkater
    });
  });
} else {
  res.redirect("/sessions/accessdenied");
}

});

// -- edit fitness
router.get("/:id/fitness", (req, res) => {
  if (req.session.username) {
    Skater.findById(req.params.id, (error, foundSkater) => {
      res.render("skaters/skills/fitness.ejs", {
        skater: foundSkater
      });
    });
  } else {
    res.redirect('/sessions/accessdenied')
  }
});

// -- edit teamwork
router.get("/:id/teamwork", (req, res) => {
  if (req.session.username) {
    Skater.findById(req.params.id, (error, foundSkater) => {
      res.render("skaters/skills/teamwork.ejs", {
        skater: foundSkater
      });
    });
  } else {
    res.redirect('/sessions/accessdenied')
  }
});

// -- edit coachability
router.get("/:id/coachability", (req, res) => {
  if (req.session.username) {
    Skater.findById(req.params.id, (error, foundSkater) => {
      res.render("skaters/skills/coachability.ejs", {
        skater: foundSkater
      });
    });
  } else {
    res.redirect('/sessions/accessdenied')
  }

});

// -- show overview after asessing coachability
router.get("/:id/overview", (req, res) => {
  if (req.session.username) {
    Skater.findById(req.params.id, (error, foundSkater) => {
      console.log(logic.average.total(foundSkater));
      res.render("skaters/skills/overview.ejs", {
        skater: foundSkater,
        average: logic.average.total(foundSkater)
      });
    });
  } else {
    res.redirect('/sessions/accessdenied')
  }
});

// ============== PUT ROUTES ==============
// -- UPDATE(put) ROUTE
// adding data from the EDIT route
// -- put route for agility
router.put("/:id/agility", (req, res) => {
  Skater.findByIdAndUpdate(
    req.params.id,
    { $set: { "skills.agility": req.body } },
    { new: true },
    (error, updatedData) => {
      res.redirect("/skills/" + updatedData.id + "/fitness");
    }
  );
});

// -- put route for fitness
router.put("/:id/fitness", (req, res) => {
  Skater.findByIdAndUpdate(
    req.params.id,
    { $set: { "skills.fitness": req.body } },
    { new: true },
    (error, updatedData) => {
      res.redirect("/skills/" + updatedData.id + "/teamwork");
    }
  );
});

// -- put route for teamwork
router.put("/:id/teamwork", (req, res) => {
  Skater.findByIdAndUpdate(
    req.params.id,
    { $set: { "skills.teamwork": req.body } },
    { new: true },
    (error, updatedData) => {
      res.redirect("/skills/" + updatedData.id + "/coachability");
    }
  );
});

// -- put route for coachability
router.put("/:id/coachability", (req, res) => {
  Skater.findByIdAndUpdate(
    req.params.id,
    { $set: { "skills.coachability": req.body } },
    { new: true },
    (error, updatedData) => {
      res.redirect("/skills/" + updatedData.id + "/overview");
      console.log(updatedData);
    }
  );
});

// -- route for adding to the team
router.get("/:id/accepted", (req, res) => {
  Skater.findByIdAndUpdate(
    req.params.id,
    { accepted: true },
    { new: true },
    (error, updatedData) => {
      res.send(updatedData);
    }
  );
});

// -- route for rejecting the skater to the team
router.get("/:id/dismiss", (req, res) => {
  Skater.findByIdAndUpdate(
    req.params.id,
    { accepted: false },
    { new: true },
    (error, updatedData) => {
      res.send(updatedData);
    }
  );
});

module.exports = router;
