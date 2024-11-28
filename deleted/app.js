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
mongoose.connect('mongodb+srv://suzannebiju:0987654321@cluster0.z9ii2.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true })
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
app.get('/', (req, res) => {
    db.all('SELECT * FROM surveys', [], (err, rows) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }
      res.send(`
        <html>
          <head><title>Survey Hub</title></head>
          <body>
            <h1>Welcome to our survey creation hub</h1>
            <a href="/create">Create New Survey</a>
            <h2>Available Surveys</h2>
            <table border="1">
              <tr><th>Title</th><th>Description</th><th>Date Created</th><th>Actions</th></tr>
              ${rows.map(row => `
                <tr>
                  <td>${row.title}</td>
                  <td>${row.description}</td>
                  <td>${row.date_created}</td>
                  <td>
                    <a href="/edit/${row.id}">Edit</a>
                    <a href="/delete/${row.id}">Delete</a>
                  </td>
                </tr>
              `).join('')}
            </table>
          </body>
        </html>
      `);
    });
  });
  
  app.get('/create', (req, res) => {
    res.send(`
      <html>
        <head><title>Create Your Survey</title></head>
        <body>
          <h1>Create New Survey</h1>
          <form action="/create" method="POST">
            <label for="title">Survey Title:</label><br>
            <input type="text" id="title" name="title" required><br><br>
            
            <label for="description">Description:</label><br>
            <textarea id="description" name="description" required></textarea><br><br>
            
            <button type="Finish">Create Survey</button>
          </form>
          <a href="/">Back to List</a>
        </body>
      </html>
    `);
  });
  
  app.post('/create', (req, res) => {
    const { title, description } = req.body;
    const date_created = new Date().toISOString();
  
    db.run('INSERT INTO surveys (title, description, date_created) VALUES (?, ?, ?)', [title, description, date_created], function (err) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }
      res.redirect('/');
    });
  });
  
  app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM surveys WHERE id = ?', [id], (err, row) => {
      if (err || !row) {
        console.error(err);
        res.sendStatus(404);
        return;
      }
      res.send(`
        <html>
          <head><title>Edit Survey</title></head>
          <body>
            <h1>Edit Survey</h1>
            <form action="/edit/${row.id}" method="POST">
              <label for="title">Survey Title:</label><br>
              <input type="text" id="title" name="title" value="${row.title}" required><br><br>
              
              <label for="description">Description:</label><br>
              <textarea id="description" name="description" required>${row.description}</textarea><br><br>
              
              <button type="submit">Save Changes</button>
            </form>
            <a href="/">Back to List</a>
          </body>
        </html>
      `);
    });
  });
  
  app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
  
    db.run('UPDATE surveys SET title = ?, description = ? WHERE id = ?', [title, description, id], function (err) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }
      res.redirect('/');
    });
  });
  app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
  
    db.run('DELETE FROM surveys WHERE id = ?', [id], function (err) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }
      res.redirect('/');
    });
  });
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
