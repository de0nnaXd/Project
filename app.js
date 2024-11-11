const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = 4000; 

const app = express();


mongoose.connect('mongodb://localhost:27017/survey-site', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


const surveyRoutes = require('./routes/surveys');
app.use('/surveys', surveyRoutes);


app.get('/', (req, res) => {
  res.render('index');
});


app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
