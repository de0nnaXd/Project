let mongoose = require('mongoose');

// inputs
let surveyModel = mongoose.Schema ({
    name: String,
    description: String,
    numQ: String
    },
    {
        collections: "survey"
    }
);

module.exports = mongoose.model('Survey', surveyModel);

