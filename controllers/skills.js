//==========================
// DEPENDENCIES
//==========================
// -- express server
const express = require('express')

//-- adding the router
const router = express.Router()

// -- db collection
const Skater = require('../models/skaters.js')


//=====================
//  APP LOGIC
//=====================
const agilityAverage = (skater) => {
  const stats = skater.skills.agility
  const skillLength = Object.keys(skater.skills.agility).length -1
  let total = 0
  total += stats.lateralMovement
  total +=stats.hockeyStop
  total += stats.plowStop
  total += stats.turningToeStop
  total += stats.powerSlide
  total += stats.transitions
  total += stats.backwardsSkating

  total = Math.floor(total/skillLength)
  return total
}

const fitnessAverage = (skater) => {
  const stats = skater.skills.fitness
  const skillLength = Object.keys(skater.skills.fitness).length -1
  let total = 0
  total += stats.speedEndurance
  total +=stats.recovery

  total = Math.floor(total/skillLength)
  return total
}

const teamworkAverage = (skater) => {
  const stats = skater.skills.teamwork
  const skillLength = Object.keys(skater.skills.teamwork).length -1
  let total = 0
  total += stats.packwork
  total +=stats.strategyAdaptability
  total +=stats.awarenessCommunication

  total = Math.floor(total/skillLength)
  return total
}

const coachabilityAverage = (skater) => {
  const stats = skater.skills.coachability
  const skillLength = Object.keys(skater.skills.coachability).length -1
  let total = 0
  total += stats.proactiveness
  total +=stats.mentalRecovery
  total +=stats.sportspersonship

  total = Math.floor(total/skillLength)
  return total
}

//=====================
//  ROUTES
//=====================
// ============== GET ROUTES ==============
// -- index route redirects to skaters index page
router.get('/', (req, res) => {
  Skater.find({}, (error, query) => {
    res.render('skaters/index.ejs',
    {
      skaters: query
    })

  })
})

// ================== edit routes
// -- edit agility
router.get('/:id/agility', (req, res) => {
  Skater.findById(req.params.id, (error, foundSkater) => {
    res.render('skaters/skills/agility.ejs',
    {
      skater: foundSkater
    })
  })
})

// -- edit fitness
router.get('/:id/fitness', (req, res) => {
  Skater.findById(req.params.id, (error, foundSkater) => {
    res.render('skaters/skills/fitness.ejs',
    {
      skater: foundSkater
    })
  })
})


// -- edit teamwork
router.get('/:id/teamwork', (req, res) => {
  Skater.findById(req.params.id, (error, foundSkater) => {
    res.render('skaters/skills/teamwork.ejs',
    {
      skater: foundSkater
    })
  })
})

// -- edit coachability
router.get('/:id/coachability', (req, res) => {
  Skater.findById(req.params.id, (error, foundSkater) => {
    res.render('skaters/skills/coachability.ejs',
    {
      skater: foundSkater
    })
  })
})

// -- show overview after asessing coachability
router.get('/:id/overview', (req, res) => {
  Skater.findById(req.params.id, (error, foundSkater) => {
    const agilityAvg = agilityAverage(foundSkater)
    const fitnessAvg = fitnessAverage(foundSkater)
    const teamworkAvg = teamworkAverage(foundSkater)
    const coachabilityAvg = coachabilityAverage(foundSkater)

    console.log(agilityAvg);
    console.log(fitnessAvg);
    console.log(teamworkAvg);
    console.log(coachabilityAvg);

    res.render('skaters/skills/overview.ejs',
    {
      skater: foundSkater
    })
  })
})


// ============== PUT ROUTES ==============
// -- UPDATE(put) ROUTE
// adding data from the EDIT route
// -- put route for agility
router.put('/:id/agility', (req, res) => {
  Skater.findByIdAndUpdate(req.params.id, {$set: {'skills.agility':req.body} }, {new:true}, (error, updatedData) => {
    res.redirect('/skills/'+updatedData.id+'/fitness')
  })
})


// -- put route for fitness
router.put('/:id/fitness', (req, res) => {
  Skater.findByIdAndUpdate(req.params.id,{$set: {'skills.fitness':req.body} }, {new:true}, (error, updatedData) => {
    res.redirect('/skills/'+updatedData.id+'/teamwork')
  })
})


// -- put route for teamwork
router.put('/:id/teamwork', (req, res) => {
  Skater.findByIdAndUpdate(req.params.id,{$set: {'skills.teamwork':req.body} }, {new:true}, (error, updatedData) => {
    res.redirect('/skills/'+updatedData.id+'/coachability')
  })
})

// -- put route for coachability
router.put('/:id/coachability', (req, res) => {
  Skater.findByIdAndUpdate(req.params.id,{$set: {'skills.coachability':req.body} }, {new:true}, (error, updatedData) => {
    res.redirect('/skills/'+updatedData.id+'/overview')
  })
})


module.exports = router
