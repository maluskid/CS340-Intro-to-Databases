const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3131;


// Middleware:

// If on FLIP, use cors() middleware to allow cross-origin requests from the frontend with your port number:
// EX (local): http://localhost:5173 
// EX (FLIP/classwork) http://flip3.engr.oregonstate.edu:5173
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());



// API Routes for backend CRUD:
// app.use("/api/people", require("./routes/peopleRoutes"));

app.get('/', (req, res) => {
  res.send('Is this working???')
});




// Add your Connect DB Activitiy Code Below:
// ...

// Match to your database config route

// NOT PROMISE BASED SQL ---------------------------------------------------
// const pool = require('./database/config.js');

// app.get('/api/test', async (req, res) => {
//   const result = pool.query('SHOW tables;', (err, rows, fields) => {
//     if (err instanceof Error) {
//       console.log(err);
//       return;
//     }
//     res.json(rows);
//     console.log(rows);
//     console.log(fields);
//   })
// });

// PROMISE BASED SQL ------------------------------------------------------
const promisePool = require('./database/config.js');

app.get('/api/test', async (req, res) => {
  try {
    const [rows, fields] = await promisePool.query('SHOW tables;')
    res.json(rows);
    console.log(rows);
    console.log(fields);
  }
  catch (error) {
    console.error('Database operation failed:', error);
    res.status(500).send('Server error');
  }
});

// define a new GET request with express:
app.get('/api/diagnostic', async (req, res) => {
  try {
    // Await your database queries here
    await promisePool.query('DROP TABLE IF EXISTS diagnostic;');
    await promisePool.query('CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);');
    await promisePool.query('INSERT INTO diagnostic (text) VALUES ("MySQL is working!")');
    const [rows, fields] = await promisePool.query('SELECT * FROM diagnostic;');

    // res.json() automatically stringifies the JavaScript object to JSON
    res.json(rows);
    console.log(rows);
    console.log(fields);

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error);
    res.status(500).send('Server error');
  }
});


// ...
// End Connect DB Activity Code.



app.listen(PORT, () => {
  // Change this text to whatever FLIP server you're on
  console.log(`Server running:  http://classwork.engr.oregonstate.edu:${PORT}...`);
});
