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

// -- seed data
const skaterSeed = require("../models/seed.js");


//=====================
//  ROUTES
//=====================
// ============== GET ROUTES ==============
// SEED ROUTE
router.get('/new/seed', (req, res) => {
  if (req.session.username) {
    // logic.dataManipulation.seedManipulation(skaterSeed, req.session.teamId)
    for(let i = 0; i < skaterSeed.length; i++){
      skaterSeed[i].teamdId = req.session.teamId
    }
    console.log(skaterSeed);
    Team.findById(req.session.teamId, (error, foundTeam) => {
        Skater.create(skaterSeed, (error, createdSkater) => {
          console.log(foundTeam);
          // res.send(createdSkater)
          foundTeam.skaters.push.apply(foundTeam.skaters, createdSkater)
          foundTeam.save((error, data) => {
            res.redirect('/')
          })
        })
    })
  } else {
    res.redirect("/sessions/accessdenied");
  }

})


// ============== GET ROUTES ==============
// -- index route
router.get("/", (req, res) => {
if (req.session.username) {
  Skater.find({ teamId: req.session.teamId, accepted: false }, (error, foundSkaters) => {
    res.render("skaters/index.ejs", {
      skaters: foundSkaters
    });
  });
} else {
  res.redirect("/sessions/accessdenied");
}
});


// -- status route
router.get('/status/find', (req, res) => {
  Team.find({}, (error, allTeams) => {
    res.render('skaters/findstatus.ejs',
    {
      teams:allTeams
    })
  })
})

// -- new route
// not session protected so new skaters can add themselves for tryouts
router.get("/new", (req, res) => {
  if (req.session.username) {
    Team.find({_id: req.session.teamId}, (error, foundTeam) => {
      res.render('skaters/new.ejs',
      {
        teams: foundTeam
      })
    })
  } else {
    Team.find({}, (error, allTeams) => {
      res.render('skaters/new.ejs',
      {
        teams:allTeams
      })
    })
  }
});

// -- show route
router.get("/:id", (req, res) => {
  if (req.session.username) {
    Skater.findById(req.params.id, (error, foundSkater) => {
      res.render("skaters/show.ejs", {
        skater: foundSkater
      });
      // res.send(foundSkater)
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
  const teamId = req.body.teamId
  if (req.body.isVeteran === "on") {
    req.body = logic.dataManipulation.veteranSkater(req.body);
    req.body.teamId = teamId
  }
  // console.log(req.body);
  // res.send(req.body)
  Team.findById(req.body.teamId, (error, foundTeam) => {
    console.log(foundTeam);
      Skater.create(req.body, (error, createdSkater) => {
        // res.send(createdSkater)
        foundTeam.skaters.push(createdSkater)
        foundTeam.save((error, data) => {
          res.redirect('/')
        })
      })
  })
});

// -- getting status
router.post("/status", (req, res) => {
  req.body.name = req.body.name.toLowerCase()
  Skater.find(req.body, (error, foundSkater) => {
    // res.send(foundSkater)
    // console.log(foundSkater.accepted);
    res.render("skaters/status.ejs",
    {
      skater: foundSkater[0]
    })
  })
});

// ============== DESTROY ROUTES ==============
// it takes the ID from the url send in the form+submit button
router.delete("/:id", (req, res) => {
  Skater.findByIdAndRemove(req.params.id, (error, deletedData) => {
    Team.findOne({'skaters._id':req.params.id}, (error, foundTeam) => {
      foundTeam.skaters.id(req.params.id).remove()
      foundTeam.save((error, data) => {
        res.redirect("/skaters");
      })
    })
  });
});

module.exports = router;
