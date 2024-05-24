// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of GamesHasPlayers 
const getGamesHasPlayers = async (req, res) => {
  res.status(200)
  try {
    // Select all rows from the "GamesHasPlayers" table
    const query = "SELECT * FROM Games_Has_Players";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching people from the database:", error);
    res.status(500).json({ error: "Error fetching people" });
  }
};

module.exports = {
  getGamesHasPlayers
  // getPersonByID,
  // createPerson,
  // updatePerson,
  // deletePerson,
};