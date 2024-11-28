let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// tracker model --> database
let Survey = require('../models/tracker');

/*
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

*/

// R: display
router.get('/', (req, res) => {
    // Retrieve all assignments from the database
    Survey.find()
        .then((surveylist) => {
            console.log(surveylist);
            res.render('public', { title: 'Survey Surplex', Surveylist: surveylist });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Cannot display assignments');
        });
});

router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const surveytoEdit = await surveytoEdit.findById(id);
        res.render('edit',
            {
                title:'Edit Survey',
                Survey:surveytoEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedSurvey = Survey({
            "_id":id,
            "name": req.body.name,
            "description": req.body.description,
            "numQ": req.body.numQ
        });
        Survey.findByIdAndUpdate(id,updatedSurvey).then(()=>{
            res.redirect('/public')
        })
    }
    catch(err){
        console.error(err);
        res.render('/public',{
            error:'Error on the server'
        })
    }
});

// D: delete --> GET
router.post('/delete/:id', (req, res) => {
    let id = req.params.id
    // Find and remove the assignment by its ID
    // button confirm delete here
    Survey.deleteOne({_id:id}).then(()=>{
        res.redirect('/public');
    }).catch((err) => {
        console.log(err);
        res.status(500).send('Cannot delete assignment');
    });
});

module.exports = router;


/* 
MVC --> Model View Controller
model --> to connect our logic
view --> pages 
controller --> the logic behihd our routes
*/