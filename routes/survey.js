const express = require('express');
const router = express.Router();
const Survey = require('../models/survey'); // accessing the model for surveys

// POST --> used for form submission and creating our survey
router.post('/create-survey', async (req, res) => {
    const {survey_name, survey_description, num_questions} = req.body;

    // creating our survey q's and etc
    const createSurvey = new Survey({
        name: survey_name,
        description : survey_description,
        numQ : num_questions,
    });
    
    try {
        await createSurvey.save(); // save survey to database
        res.redirect('/'); // go back to landing page
    } catch (err) {
        console.error('Survey did not upload: ', err);
        res.status(500).send('Error saving survey');
    }
});

module.exports = router; // exporting router so that app.js can access it and its functions
