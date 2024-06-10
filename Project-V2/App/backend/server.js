// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for server:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3131;

// Middleware:
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

// API Routes for backend CRUD:
app.use("/api/teams", require("./routes/teamsRoutes"));
app.use("/api/players", require("./routes/playersRoutes"));
app.use("/api/games", require("./routes/gamesRoutes"));
app.use("/api/gamesHasPlayers", require("./routes/gamesHasPlayersRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/ratings", require("./routes/ratingsRoutes"));

app.get('/', (req, res) => {
  res.send('Is this working???')
});

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
  console.log(`Server running:  http://classwork.engr.oregonstate.edu:${PORT}...`);
});
