let mongoose = require('mongoose');

// inputs
let ticketModel = mongoose.Schema ({
    ticket: String,
    incident: String,
    description: String
    },
    {
        collections: "ticket"
    }
);

module.exports = mongoose.model('Ticket', ticketModel);

