//=====================
//  DEPENDENCIES
//=====================
// -- library dependencies
const mongoose = require('mongoose')

//=====================
//  SCHEMA
//=====================
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  teamId: String
})

//=====================
//  COLLECTION
//=====================
const User = mongoose.model('User', userSchema)

module.exports = User
