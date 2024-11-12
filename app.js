const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const surveyRoutes = require('./routes/survey'); //direct to survey.js in routes
const app = express();
const path = require('path');
const port = 3000;

// config express to use EJS as engine
app.set('view engine', 'ejs');

// middleware related to css
app.use(express.static(path.join(__dirname, 'public')));

// middleware --> parse data
app.use(bodyParser.urlencoded({ extended: true}));

app.use(surveyRoutes);

// beginning of mongo database connection --> insert your mongodb in here
mongoose.connect('mongodb+srv://xxxxx', {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to Database');
    })
    .catch(err => {
        console.error('There was an Error conntecting to the Database', err);
    });

/* 
display active surveys on landing page
keyword --> async temporary function that is fulfilled later with use of await function to prevent error until the condition is met
*/
app.get('/', async (req, res) => {
    // fetch database surveys
    Survey.find({}, (err, surveys) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error accessing the Database');
        }
        res.render('landing', {surveys}); // let surveys from database be viewed in landing
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
