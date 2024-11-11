<!-- server.js -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>.......Title........</h1>
    </header>

    <!-- survey content here -->

    <footer>
        <p>.............. All rights reserved ....... </p>
    </footer>

</body>
</html>



<!-- survey content in the 'app.ejs file'

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
