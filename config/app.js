// In your app.js file

let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let createError = require('http-errors');

// Include your routes
let landingRouter = require('../routes/landing');
let usersRouter = require('../routes/users');
let publicRouter = require('../routes/public'); 
let ticketRouter = require('../routes/ticket');
let loginRouter = require('../routes/login'); // Make sure this is included

let app = express();

// MongoDB connection
let DB = require('./db');
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error: '));
mongoDB.once('open', () => {
  console.log('connected with MongoDB');
});

// View engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));

// Route setup
app.use('/', landingRouter);
app.use('/users', usersRouter);
app.use('/public', publicRouter); 
app.use('/ticket', ticketRouter);
app.use('/login', loginRouter); // Ensure this is set up correctly

// 404 error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // Set loggedIn to false if it's not defined
  res.locals.loggedIn = req.query.loggedIn ? true : false;

  res.status(err.status || 500);
  res.render('error', {
      title: "Error"
  });
});

module.exports = app;