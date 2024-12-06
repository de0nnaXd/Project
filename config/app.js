let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let passportlocal = require('passport-local');
let flash = require('connect-flash');
let mongoose = require('mongoose');
let app = express();

// MongoDB connection
let DB = require('./db');
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error: '));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB');
});

// User model and Passport authentication
let userModel = require('../models/user');
let User = userModel.User;

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Express-session setup
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash());

// Debugging middleware
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  res.locals.loggedIn = req.isAuthenticated();
  next();
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

// Routes
let landingRouter = require('../routes/landing');
let usersRouter = require('../routes/users');
let publicRouter = require('../routes/public');
let ticketRouter = require('../routes/ticket');
let loginRouter = require('../routes/login');

app.use('/',landingRouter);
app.use('/users', usersRouter);
app.use('/public', publicRouter);
app.use('/ticket', ticketRouter);
app.use('/login', loginRouter);

// 404 error handler
app.use((req, res, next) => {
  next(createError(404));
});

// General error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', { title: "Error" });
});

module.exports = app;
