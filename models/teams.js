//=====================
//  DEPENDENCIES
//=====================
// -- library dependencies
const mongoose = require('mongoose')

const Skater = require("../models/skaters.js");

const User = require("../models/users.js");

//=====================
//  SCHEMA
//=====================
const teamSchema = new mongoose.Schema({
  name: {type: String, unique:true},
  inviteCode:{type: String, unique:true},
  users:[User.schema],
  skaters:[Skater.schema]
})

//=====================
//  COLLECTION
//=====================
const Team = mongoose.model('Team', teamSchema)

module.exports = Team
