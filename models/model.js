const mongoose = require('mongoose');

// specifications regarding the entries in the surveys
const surveySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    numQ: { type: Number, required: true },
});

// create the mmodel aka servey
const Survey = mongoose.model('Survey', surveySchema);

// export
module.exports = Survey;
