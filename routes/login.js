const express = require('express');
const passport = require('passport');
const User = require('../models/user'); 
const router = express.Router();

// Display login page
router.get('/', (req, res, next) => {
    if (!req.user) { // If user not logged in...
        res.render('authen/login', {
            title: 'Login',
            message: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else { // If user is logged in...
        return res.redirect('/landing');
    }
});

// Process login form submission
router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/landing');
        });
    })(req, res, next);
});

module.exports = router;
