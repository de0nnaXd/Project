// routes/login.js
let express = require('express');
let router = express.Router();

// Render login page
router.get('/', (req, res) => {
    const message = req.query.message || '';
    const loggedIn = req.query.loggedIn ? true : false;
    res.render('login', { 
        title: 'Login', message,
        loggedIn  // Display login status based on query parameter
    });
});

// Handle login submission
router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Hardcoded credentials (for demonstration purposes)
    if (username === 'admin' && password === 'admin') {
        // Redirect to ticket page with a loggedIn query parameter
        res.redirect('/ticket?loggedIn=true');
    } else {
        // Redirect back to login with an error message
        res.redirect('/login?message=Invalid credentials');
    }
});

// Logout route
router.get('/logout', (req, res) => {
    
    res.redirect('/login?message=Logged out');
});

module.exports = router;