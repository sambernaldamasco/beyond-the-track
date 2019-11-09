//============================
//  DEPENDENCIES
//============================
// -- express
const express = require('express')

// -- methodOverride
const methodOverride = require('method-override')

// -- mongoose
const mongoose = require('mongoose')

// -- bcrypt
const bcrypt = require('bcrypt')

// -- session
const session = require('express-session')

// -- requiring the .env file
// it takes the variable out from the .env file and passes to the server
require('dotenv').config()

// -- controllers
const skatersController = require('./controllers/skaters.js')

const skillsController = require('./controllers/skills.js')

const teamController = require('./controllers/team.js')

const usersController = require('./controllers/users.js')

const sessionsController = require('./controllers/sessions.js')


//============================
//  GLOBAL CONFIGS
//============================
// variable for the express function
const app = express()

// variable for the mongoose connection
const db = mongoose.connection

//this is coming from the .env file set up earlier
const PORT = process.env.PORT

// -- mongodb connection URL from .env file
const MONGODB_URI = process.env.MONGODB_URI

//============================
//  MIDDLEWARE
//============================
// -- public folder for static assets(css)
app.use(express.static('public'))

// -- req.body with parsed info from forms
app.use(express.urlencoded( {extended: false} ))

// -- method override(for delete and put routes)
app.use(methodOverride('_method'))

// -- adding the section middleware
// it's a function, it takes a secret, a random string.
// resave, and saveUnitialized
app.use(session({
  secret: 'fightfightfight',
  resave: false,
  saveUninitialized: false
}))

//========= controllers middleware
app.use('/skaters', skatersController)

app.use('/skills', skillsController)

app.use('/team', teamController)

app.use('/users', usersController)

app.use('/sessions', sessionsController)


//============================
//  ROUTES
//============================
app.get('/', (req, res) => {
  res.render('home.ejs')
})


//============================
//  CONNECTION
//============================
// ------------------ MONGODB
// setting the connection
mongoose.connect(MONGODB_URI, { useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex: true })

// error/success messaging
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected to: ', MONGODB_URI))
db.on('disconnected', () => console.log('mongo disconnected'))


// -------------- LISTENER
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})
