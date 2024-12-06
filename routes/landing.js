// routes/landing.js
var express = require('express');
var router = express.Router();
let indexController = require('../controller/index');


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



//Get router for login page
router.get('/login', indexController.displayLoginPage);
//Post router for login page
router.post('/login', indexController.processLoginPage);
//Get router for registration page
router.get('/register', indexController.displayRegisterPage);
//Post router for register page
router.post('/register', indexController.processRegisterPage);
//Get router for logout page
router.get('/logout', indexController.performLogout);


module.exports = router;

/* 
MVC --> Model View Controller
model --> to connect our logic
view --> pages 
controller --> the logic behihd our routes
*/
