let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// tracker model --> database
let Ticket = require('../models/ticketmodel');

router.get('/', (req, res) => {
    res.render('ticket');
});

// C: add assignment --> POST
router.post('/add', (req, res) => {
    // new assignment
    let newTicket = new Ticket({
        ticket: req.body.ticket,
        incident: req.body.incident,
        description: req.body.description
    });

    // save new assignment to the database
    newTicket.save()
        .then(() => {
            // After saving, redirect to /public to show the updated list
            res.redirect('/public');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Cannot add assignment');
        });
});

module.exports = router;