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
//  ROUTES
//=====================
// ============== GET ROUTES ==============
// -- index route
router.get('/', (req, res) => {
  Skater.find({}, (error, query) => {
    res.render('skaters/index.ejs',
    {
      skaters: query
    })

  })
})

// -- show route
router.get('/:id', (req, res) => {
  Skater.findById(req.params.id, (error, foundSkater) => {
    res.render('skaters/show.ejs',
    {
      skater: foundSkater
    })
  })
})

// -- new route
router.get('/new', (req, res) => {
  res.render('skaters/new.ejs')
})

// ================== edit routes
// -- edit agility
router.get('/:id/skills/agility', (req, res) => {
  Skater.findById(req.params.id, (error, foundSkater) => {
    res.render('skaters/skills/agility.ejs',
    {
      skater: foundSkater
    })
  })
})

// -- edit fitness
router.get('/:id/skills/fitness', (req, res) => {
  Skater.findById(req.params.id, (error, foundSkater) => {
    res.render('skaters/skills/fitness.ejs',
    {
      skater: foundSkater
    })
  })
})


// -- edit teamwork
router.get('/:id/skills/teamwork', (req, res) => {
  Skater.findById(req.params.id, (error, foundSkater) => {
    res.render('skaters/skills/teamwork.ejs',
    {
      skater: foundSkater
    })
  })
})

// -- edit coachability
router.get('/:id/skills/coachability', (req, res) => {
  Skater.findById(req.params.id, (error, foundSkater) => {
    res.render('skaters/skills/coachability.ejs',
    {
      skater: foundSkater
    })
  })
})

// ============== POST ROUTES ==============
// -- CREATE(post) ROUTE
// posting the info from the form on the route NEW
router.post('/', (req, res) => {
  // res.send(req.body.name)
  Skater.create(req.body, (error, createdSkater) => {
  res.send(createdSkater)
  })
})



// ============== PUT ROUTES ==============
// -- UPDATE(put) ROUTE
// adding data from the EDIT route
// -- put route for agility
router.put('/:id/skills/agility', (req, res) => {
  Skater.findByIdAndUpdate(req.params.id, {$set: {'skills.agility':req.body} }, {new:true}, (error, updatedData) => {
    res.send(updatedData)
  })
})


// -- put route for fitness
router.put('/:id/skills/fitness', (req, res) => {
  Skater.findByIdAndUpdate(req.params.id,{$set: {'skills.fitness':req.body} }, {new:true}, (error, updatedData) => {
    res.send(updatedData)
  })
})


// -- put route for teamwork
router.put('/:id/skills/teamwork', (req, res) => {
  Skater.findByIdAndUpdate(req.params.id,{$set: {'skills.teamwork':req.body} }, {new:true}, (error, updatedData) => {
    res.send(updatedData)
  })
})

// -- put route for coachability
router.put('/:id/skills/coachability', (req, res) => {
  Skater.findByIdAndUpdate(req.params.id,{$set: {'skills.coachability':req.body} }, {new:true}, (error, updatedData) => {
    res.send(updatedData)
  })
})

module.exports = router
