/* 
port etc for running web
use POST for servey
applying mongoose onto server to get server from user
*/

const mongoose = require("mongoose");
const app = express();

mongoose.connect("") // link to mongoose cluster
const userSchema = new mongoose.Schema({
    survey_name: String,
    survey_description: String,
    questions: [
        {
            question_text: String,
            answer_type: {type: String, enum: ['True/False']}
        }
    ],

    responses: [
        {
            user_id: String,
            answers: [
                {
                    question_id: Number, // question number to identify each question ie:question 1/question 2
                    answer: {type: String, enum: ['True', 'False']}
                }
            ]
        }
    ]
});

const Survey = mongoose.model('Survey', surveySchema);
MediaSourceHandle.exports = Survey;
