//==========================
// DEPENDENCIES
//==========================
// -- express server
const express = require('express')

//-- adding the router
const router = express.Router()

// -- adding the db collection
const User = require('../models/users.js')

const Team = require("../models/teams.js");

// -- bcrypt
const bcrypt = require('bcrypt')


//=====================
//  ROUTES
//=====================
// ============== GET ROUTES ==============
// -- NEW
router.get('/new', (req, res) => {
  Team.find({}, (error, allTeams) => {
    res.render('users/new.ejs',
    {
      teams:allTeams
    })
  })
})

// ============== POST ROUTES ==============
router.post('/', (req, res) => {
  Team.findById(req.body.teamId, (error, foundTeam) => {
    if (req.body.inviteCode === foundTeam.inviteCode) {
      // encrypting the password with bcrypt
      req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
      User.create(req.body, (error, createdUser) => {
        req.session.username = createdUser.username
        req.session.teamId = req.body.teamId
        foundTeam.users.push(createdUser)
        foundTeam.save((error, data) => {
          res.redirect('/')

        })
      })
    } else {
      Team.find({}, (error, allTeams) => {
        res.render('users/codeInvalid.ejs',
        {
          code: req.body.inviteCode,
          username: req.body.username,
          teams:allTeams
        })
      })
    }
  })
})

module.exports = router
