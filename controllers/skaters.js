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
  const updatedValue = {
    skills:{
      agility: {
        lateralMovement: req.body.lateralMovement,
        hockeyStop: req.body.hockeyStop,
        plowStop: req.body.plowStop,
        turningToeStop: req.body.turningToeStop,
        powerSlide: req.body.powerSlide,
        transitions: req.body.transitions,
        backwardsSkating: req.body.backwardsSkating
      }
    }
  }
  res.send(updatedValue)
})

module.exports = router
