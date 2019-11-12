//=====================
//  DEPENDENCIES
//=====================
// -- library dependencies
const mongoose = require('mongoose')

//=====================
//  SCHEMA
//=====================

const skaterSchema = new mongoose.Schema({
  name: String,
  skills: {
    agility:{
      lateralMovement: {type: Number, default: 1},
      hockeyStop: {type: Number, default: 1},
      plowStop: {type: Number, default: 1},
      turningToeStop: {type: Number, default: 1},
      powerSlide: {type: Number, default: 1},
      transitions: {type: Number, default: 1},
      backwardsSkating: {type: Number, default: 1}
    },
    fitness:{
      speedEndurance: {type: Number, default: 1},
      recovery: {type: Number, default: 1},
    },
    teamwork:{
      packwork: {type: Number, default: 1},
      strategyAdaptability: {type: Number, default: 1},
      awarenessCommunication: {type: Number, default: 1},
    },
    coachability: {
      proactiveness: {type: Number, default: 1},
      mentalRecovery: {type: Number, default: 1},
      sportspersonship: {type: Number, default: 1}
    }
  },
  isVeteran: {type: Boolean, default: false},
  accepted: {type: Boolean, default: false},
  assessed: {type: Boolean, default: false},
  teamId: String

})


//=====================
//  COLLECTION
//=====================
const Skater = mongoose.model('Skater', skaterSchema)

module.exports = Skater




















//////////////////////////////////////////////
// CODE GRAVEYARD
/////////////////////////////////////////////
//having to create a subdocument schema for the the skills portion of the skater schema to be able to set default value for them

// const skillsSchema = new mongoose.Schema({
//     lateralMovement: {type: Number, default: 1},
//     hockeyStop: {type: Number, default: 1},
//     plowStop: {type: Number, default: 1},
//     turningToeStop: {type: Number, default: 1},
//     powerSlide: {type: Number, default: 1},
//     transitions: {type: Number, default: 1},
//     lateralMovement: {type: Number, default: 1}
// })
  // skills:[
  //   {agility:[
  //     {lateralMovement: {type: Number, default: 1}},
  //     {hockeyStop: {type: Number, default: 1}},
  //     {plowStop: {type: Number, default: 1}},
  //     {turningToeStop: {type: Number, default: 1}},
  //     {powerSlide: {type: Number, default: 1}},
  //     {transitions: {type: Number, default: 1}},
  //     {lateralMovement: {type: Number, default: 1}},
  //   ]},
  //   {fitness:[
  //     {speedEndurance: {type: Number, default: 1}},
  //     {recovery: {type: Number, default: 1}}
  //   ]},
  //   {teamwork:[
  //     {packwork: {type: Number, default: 0}},
  //     {strategyAdaptability: {type: Number, default: 1}},
  //     {awarenessCommunication: {type: Number, default: 1}}
  //   ]},
  //   {coachability:[
  //     {proactiveness: {type: Number, default: 1}},
  //     {mentalRecovery: {type: Number, default: 1}},
  //     {sportspersonship: {type: Number, default: 1}}
  //   ]}
  // ]
