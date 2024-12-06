let express = require('express');
const passport = require('passport'); 
let router = express.Router();

let userModel = require('../models/user');
let User = userModel.User;

// Logic for login display page
module.exports.displayLoginPage = (req, res, next) => {
    if (!req.user) { // If user not registered...
        res.render('authen/login', // Go to login page...
        {
            title: 'Login',
            message: req.flash('loginMessage'), // View message
            displayName: req.user ? req.user.displayName : ''
        });
    } else { // Else if user IS registered...
        return res.redirect('/'); // Redirect to index page
    }
};

module.exports.processLoginPage = async (req, res, next) => {
    try {
        // Find the user in the database
        let user = await User.findOne({ username: 'test' });

        if (!user) {
            // If no user is found, create a new one for testing
            user = new User({ username: 'test', displayName: 'Test User' });

            // Set the hardcoded password for the new user
            await user.setPassword('password');

            // Save the user to the database
            await user.save();
        }

        // Log the user in
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/dashboard');
        });

    } catch (err) {
        // Handle any errors
        return next(err);
    }
};



// Logic for registration display page
module.exports.displayRegisterPage = (req, res, next) => {
    // If user not logged in
    if (!req.user) {
        res.render('authen/register',
        {
            title: 'Register',
            message: req.flash('registerMessage'), // View message
            displayName: req.user ? req.user.displayName : ''
        });
    } else { // Else if user IS registered...
        return res.redirect('/'); // Redirect to index page
    }
};

// Process the registration form
module.exports.processRegisterPage = (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName,
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            if (err.name == "UserExistsError") { // If the user already exists
                req.flash('registerMessage', 'Registration Error: User Already Exists');
            } else { // If another error occurs during registration
                req.flash('registerMessage', 'Error: Inserting the new user');
            }
            return res.render('authen/register', // Render the registration page with error
            {
                title: 'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }

        // If registration is successful
        passport.authenticate('local')(req, res, () => {
            res.redirect('/welcome'); // Redirect after registration
        });
    });
};

// Logic for logout
module.exports.performLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) { // Handle any errors during logout
            return next(err);
        }
        res.redirect('/'); // Redirect to the homepage
    });
};
