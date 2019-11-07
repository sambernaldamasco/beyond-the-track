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
router.get('/', (req, res) => {
  res.render('skaters/index.ejs')
})

router.get(':id', (req, res) => {
  res.send('this is a skater page')
})

router.get('/new', (req, res) => {
  res.render('skaters/new.ejs')
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

module.exports = router
