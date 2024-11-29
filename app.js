// main file linking everything in the server
// explanation to further understand is in express p03 vid lecture

// thirs party libraries
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let passportlocal = require('passport-local');
let localStrategy = passportlocal.Strategy;
let flash = require('connect-flash');

//User Model Instance
let userModel = require('../models/user');
let user = userModel.User;

// mongo
let mongoose = require('mongoose');
let DB = require('./db');

// mongoose to DB URI
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error: '));
mongoDB.once('open', () => {
  console.log('connected with MongoDB');
});

let app = express();

//Flash initialization
app.use(flash());

//Express-session setup
app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}))


//Passport Initialization
app.use(passport.initialize());
app.use(passport.session());



//Serialize and Deserialize User Info
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());



// to routers
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let publicRouter = require('../routes/public'); 



// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/public', publicRouter); 

// shows 404 error
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', {
    title: "Error"
  });
});

module.exports = app;
