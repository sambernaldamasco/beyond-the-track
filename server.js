//============================
//  DEPENDENCIES
//============================
// -- express
const express = require('express')

// -- methodOverride
const methodOverride = require('method-override')

// -- mongoose
const mongoose = require('mongoose')

// -- requiring the .env file
// it takes the variable out from the .env file and passes to the server
require('dotenv').config()

//============================
//  GLOBAL CONFIGS
//============================
const app = express()
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



//============================
//  ROUTES
//============================
app.get('/', (req, res) => {
  res.send('hello world')
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
