//==========================
// DEPENDENCIES
//==========================
// -- express server
const express = require('express')

//-- adding the router
const router = express.Router()




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





module.exports = router
