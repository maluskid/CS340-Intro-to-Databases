// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of Players 
const getPlayers = async (req, res) => {
  res.status(200)
  try {
    // Select all rows from the "Players" table
    const query = "SELECT * FROM Players";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching people from the database:", error);
    res.status(500).json({ error: "Error fetching people" });
  }
};

// Use for dropdown
const getPlayerOptions = async (req, res) => {
  res.status(200)
  try {
    const query = "SELECT playerID, playerName FROM Players";
    const [rows] = await db.query(query)
    res.status(200).json(rows);
    console.log("Player Options successful")
  } catch (error) {
    console.error("Error fetching player options from the database:", error);
    res.status(500).json({ error: "Error fetching player options" });
  }
};

module.exports = {
  getPlayers,
  getPlayerOptions,
  // getPersonByID,
  // createPerson,
  // updatePerson,
  // deletePerson,
};