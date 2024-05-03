// Citation for app.mjs:
// Date: 04/07/2024
// Adapted from /OR/ Based on
// code provided in Activity-2 assignment page by professor
// https://canvas.oregonstate.edu/courses/1958399/assignments/9589645

const express = require( 'express');
const db = require('./db-connector');

const PORT = 9111;
const app = express();

app.get('/', async (req, res) => {
  // Define our queries
  const query1 = 'DROP TABLE IF EXISTS diagnostic;';
  const query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
  const query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working for maluskid!")';
  const query4 = 'SELECT * FROM diagnostic;';

  // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

  // DROP TABLE...
  db.pool.query(query1, (err, results, fields) => {
    // CREATE TABLE...
    db.pool.query(query2, (err, results, fields) => {
      // INSERT INTO...
      db.pool.query(query3, (err, results, fields) => {
        // SELECT *...
        db.pool.query(query4, (err, results, fields) => {
          // Send the results to the browser
          let base = "<h1>MySQL Results:</h1>"
          res.send(base + JSON.stringify(results));
        });
      });
    });
  });
});

app.listen(PORT, () => {
  console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
