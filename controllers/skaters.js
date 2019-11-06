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
  res.send('this is index')
})

router.get(':id', (req, res) => {
  res.send('this is a skater page')
})

router.get('/new', (req, res) => {
  res.render('skaters/new.ejs')
})




module.exports = router
