//==========================
// DEPENDENCIES
//==========================
// -- express server
const express = require("express");

//-- adding the router
const router = express.Router();

// -- db collection
const Skater = require("../models/skaters.js");
const Team = require("../models/teams.js");

// -- app logic
const logic = require("../models/logic.js");

//=====================
//  ROUTES
//=====================
// ============== GET ROUTES ==============
// -- index route redirects to skaters index page
// -- index route
router.get("/", (req, res) => {
if (req.session.username) {
  Team.findById(req.session.teamId, (error, foundTeam) => {
    res.render("skaters/index.ejs", {
      skaters: foundTeam.skaters
    });
  });
} else {
  res.redirect("/sessions/accessdenied");
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
      Team.findOne({'skaters._id':req.params.id}, (error, foundTeam) => {
        foundTeam.skaters.id(req.params.id).remove()
        foundTeam.skaters.push(updatedData)
        foundTeam.save((error, data) => {
          res.redirect("/skills/" + updatedData.id + "/fitness");
        })
      })
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

      Team.findOne({'skaters._id':req.params.id}, (error, foundTeam) => {
        foundTeam.skaters.id(req.params.id).remove()
        foundTeam.skaters.push(updatedData)
        foundTeam.save((error, data) => {
          res.redirect("/skills/" + updatedData.id + "/teamwork");
        })
      })
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
      Team.findOne({'skaters._id':req.params.id}, (error, foundTeam) => {
        foundTeam.skaters.id(req.params.id).remove()
        foundTeam.skaters.push(updatedData)
        foundTeam.save((error, data) => {
          res.redirect("/skills/" + updatedData.id + "/coachability");
        })
      })
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
      Team.findOne({'skaters._id':req.params.id}, (error, foundTeam) => {
        foundTeam.skaters.id(req.params.id).remove()
        foundTeam.skaters.push(updatedData)
        foundTeam.save((error, data) => {
          res.redirect("/skills/" + updatedData.id + "/overview");
        })
      })
      console.log(updatedData);
    }
  );
});

// -- route for adding to the team
router.get("/:id/accepted", (req, res) => {
  Skater.findByIdAndUpdate(
    req.params.id,
    { accepted: true, assessed: true },
    { new: true },
    (error, updatedData) => {
      Team.findOne({'skaters._id':req.params.id}, (error, foundTeam) => {
        foundTeam.skaters.id(req.params.id).remove()
        foundTeam.skaters.push(updatedData)
        foundTeam.save((error, data) => {
          res.redirect('/team');
        })
      })
    }
  );
});

// -- route for rejecting the skater to the team
router.get("/:id/dismiss", (req, res) => {
  Skater.findByIdAndUpdate(
    req.params.id,
    { accepted: false, assessed: true },
    { new: true },
    (error, updatedData) => {
      Team.findOne({'skaters._id':req.params.id}, (error, foundTeam) => {
        foundTeam.skaters.id(req.params.id).remove()
        foundTeam.skaters.push(updatedData)
        foundTeam.save((error, data) => {
          res.redirect('/skaters');
        })
      })
    }
  );
});

module.exports = router;
