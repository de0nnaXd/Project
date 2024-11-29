let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// tracker model --> database
let Ticket = require('../models/ticketmodel');

// R: display
router.get('/', (req, res) => {
    // Retrieve all assignments from the database
    Ticket.find()
        .then((ticketlist) => {
            console.log(ticketlist);
            res.render('public', { title: 'Ticket Terror', Ticketlist: ticketlist });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Cannot display ticket');
        });
});

router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const tickettoEdit = await Ticket.findById(id);
        res.render('edit',
            {
                title:'Edit Survey',
                Ticket:tickettoEdit
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
        let updatedTicket = Ticket({
            "_id":id,
            "ticket": req.body.ticket,
            "incident": req.body.incident,
            "description": req.body.description
        });
        Ticket.findByIdAndUpdate(id,updatedTicket).then(()=>{
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
    Ticket.deleteOne({_id:id}).then(()=>{
        res.redirect('/public');
    }).catch((err) => {
        console.log(err);
        res.status(500).send('Cannot delete ticket');
    });
});

module.exports = router;


/* 
MVC --> Model View Controller
model --> to connect our logic
view --> pages 
controller --> the logic behihd our routes
*/