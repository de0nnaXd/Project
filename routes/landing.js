// routes/landing.js
var express = require('express');
var router = express.Router();

/* GET home/landing page. */
router.get('/', function(req, res, next) {
  const message = req.query.message || '';
  const loggedIn = req.query.loggedIn ? true : false; // Determine loggedIn status
  res.render('landing', { 
      title: 'Ticket Terror',
      section: 'Report an Incident today',
      message,
      loggedIn // Pass loggedIn status to the view
  });
});
module.exports = router;

/* 
MVC --> Model View Controller
model --> to connect our logic
view --> pages 
controller --> the logic behihd our routes
*/
