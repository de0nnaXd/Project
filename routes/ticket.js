let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// tracker model --> database
let Survey = require('../models/tracker');

router.get('/', (req, res) => {
    res.render('survey');
});

// C: add assignment --> POST
router.post('/add', (req, res) => {
    // new assignment
    let newSurvey = new Survey({
        name: req.body.name,
        description: req.body.description,
        numQ: req.body.numQ
    });

    // save new assignment to the database
    newSurvey.save()
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
