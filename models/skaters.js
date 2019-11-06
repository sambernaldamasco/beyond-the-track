//=====================
//  DEPENDENCIES
//=====================
// -- library dependencies
const mongoose = require('mongoose')

//=====================
//  SCHEMA
//=====================
const skaterSchema = new mongoose.Schema({
  name:{type: String, unique: true},
  skills:[
    {agility:[
      {lateralMovement: {type: Number, default: 0}},
      {hockeyStop: {type: Number, default: 0}},
      {plowStop: {type: Number, default: 0}},
      {turningToeStop: {type: Number, default: 0}},
      {powerSlide: {type: Number, default: 0}},
      {transitions: {type: Number, default: 0}},
      {lateralMovement: {type: Number, default: 0}},
    ]},
    {fitness:[
      {speedEndurance: {type: Number, default: 0}},
      {recovery: {type: Number, default: 0}}
    ]},
    {teamwork:[
      {packwork: {type: Number, default: 0}},
      {strategyAdaptability: {type: Number, default: 0}},
      {awarenessCommunication: {type: Number, default: 0}}
    ]},
    {coachability:[
      {proactiveness: {type: Number, default: 0}},
      {mentalRecovery: {type: Number, default: 0}},
      {sportspersonship: {type: Number, default: 0}}
    ]}
  ]
})

//=====================
//  COLLECTION
//=====================
const Skater = mongoose.model('Skater', skaterSchema)

module.exports = Skater
