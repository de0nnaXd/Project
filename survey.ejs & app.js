<!-- app.js -->
const mongoose = require("mongoose")
const app = express()

mongoose.connect("") // link to mongoose cluster
const userSchema = new mongoose.Schema({
    survey_name: String,
    survey_description: String,
    questions: [
        {
            question_id: Number,
            question: String,
            question_type: {type: String, enum: ['multiple_choice', 'text']}, // enum --> only allow these two values aka mc/text q
            choice: [String] // applied on for mc q's
        }
    ],
    // response from user for an answer --> string their response
    responses: [
        {
            user_id: String,
            answers: [
                {
                    question_id: Number,
                    answer: String
                }
            ]
        }
    ]
});



<!-- survey content in the 'survey.ejs file'

<!-- survey content here -->
     <form action="/create-survey" method="POST">
        <label for="survey_name">Input your desired Survey Name: </label>
        <input type="text" name="survey_name" id="survey_name" required><br>

        <label for="survey_description">Survey Description: </label>
        <textarea name="survey_description" id="survey_description" required></textarea>

        <label for="question_amount">Input amount of questions: </label>
        <input type="number" name="num_questions" min="1" required><br>

        <button type="submit">Create Survey</button>

        <!-- generate question inputs -->
        <div id="question_container"></div>

        <button type="submit">Create Survey!</button>

     </form>
