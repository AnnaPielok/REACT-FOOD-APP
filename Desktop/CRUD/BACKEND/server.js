const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(express.json()); // Enable JSON parsing
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud'
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }

  console.log('Connected to MySQL');
});

// GET all students
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM student';
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error retrieving students:', err);
      res.json('Error');
    } else {
      res.json(data);
    }
  });
});

// Create a new student
app.post('/create', (req, res) => {
  const sql = 'INSERT INTO student (`Name`, `Email`) VALUES (?)';
  const values = [req.body.name, req.body.email];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error('Error creating student:', err);
      res.json('Error');
    } else {
      res.json(data);
    }
  });
});

// Update an existing student
app.put('/update/:id', (req, res) => {
  const sql = 'UPDATE student SET Name = ?, Email = ? WHERE ID = ?';
  const values = [req.body.name, req.body.email];
  const id = parseInt(req.params.id);
  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      console.error('Error updating student:', err);
      res.json('Error');
    } else {
      res.json(data);
    }
  });
});

// Delete an existing student
app.delete('/student/:id', (req, res) => {
  const sql = 'DELETE FROM student WHERE ID = ?';
  const id = parseInt(req.params.id);
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error('Error deleting student:', err);
      res.json('Error');
    } else {
      res.json(data);
    }
  });
});

app.listen(8081, () => {
  console.log('Listening on port 8081');
});
