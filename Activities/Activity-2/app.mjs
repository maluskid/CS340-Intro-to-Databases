import 'dotenv/config';
import express from 'express';
import db from './db-connector';

const PORT = process.env.PORT;
const app = express();

app.get('/', async (req, res) => {
  // Define our queries
  query1 = 'DROP TABLE IF EXISTS diagnostic;';
  query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
  query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working for myONID!")'; //replace with your ONID
  query4 = 'SELECT * FROM diagnostic;';

  // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

  // DROP TABLE...
  db.query(query1, (err, results, fields) => {
    // CREATE TABLE...
    db.query(query2, (err, results, fields) => {
      // INSERT INTO...
      db.query(query3, (err, results, fields) => {
        // SELECT *...
        db.query(query4, (err, results, fields) => {
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
