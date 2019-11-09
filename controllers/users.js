//==========================
// DEPENDENCIES
//==========================
// -- express server
const express = require('express')

//-- adding the router
const router = express.Router()

// -- adding the db collection
const User = require('../models/users.js')

// -- bcrypt
const bcrypt = require('bcrypt')


//=====================
//  ROUTES
//=====================
// ============== GET ROUTES ==============
// -- NEW
router.get('/new', (req, res) => {
  res.render('users/new.ejs')
})

// ============== POST ROUTES ==============
router.post('/', (req, res) => {
  // encrypting the password with bcrypt
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (error, createdUser) => {
    req.session.username = createdUser.username
    res.redirect('/skaters')
  })
})

module.exports = router
