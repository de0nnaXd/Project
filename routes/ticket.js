// routes/ticket.js
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// tracker model --> database
let Ticket = require('../models/ticketmodel');

router.get('/', (req, res) => {
    const loggedIn = req.query.loggedIn ? true : false; // Set loggedIn
    res.render('ticket', { loggedIn }); // Pass loggedIn to the view
});

// Add route for adding a ticket
router.post('/add', (req, res) => {
    const loggedIn = req.query.loggedIn ? true : false; // Check if user is logged in
    if (!loggedIn) {
        return res.redirect('/login?message=You must be logged in to file a ticket');
    }

    // Create new ticket
    let newTicket = new Ticket({
        ticket: req.body.ticket,
        incident: req.body.incident,
        description: req.body.description
    });

    // Save ticket to database
    newTicket.save()
        .then(() => {
            res.redirect('/public?loggedIn=true'); // Redirect with loggedIn query
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Cannot add ticket');
        });
});


// For ticket resolution
router.post('/delete/:id', (req, res) => {
    // Check if user is logged in via query parameter
    if (!req.query.loggedIn) {
        return res.redirect('/login?message=You must be logged in to resolve a ticket');
    }

    let id = req.params.id;
    Ticket.deleteOne({ _id: id })
        .then(() => {
            res.redirect('/public?loggedIn=true'); // Redirect with loggedIn query
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Cannot delete ticket');
        });
});

module.exports = router;