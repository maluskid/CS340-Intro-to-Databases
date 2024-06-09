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

const getPlayerByID = async (req, res) => {
  res.status(200)
  try {
    const playerID = req.params.playerID;
    const query = "SELECT * FROM Players WHERE playerID = ?";
    const [result] = await db.query(query, [playerID]);
    if (result.length === 0) {
      return res.status(404).json({ error: "Player not found" });
    }
    const player = result[0]
    res.json(player)
  } catch (error) {
    console.error("Error fetching player from the database:", error);
    res.status(500).json({ error: "Error fetching player" });
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

const createPlayer = async (req, res) => {
  try {
    const { playerName, teamID, jerseyNumber, height, weight } = req.body;
    const query = "INSERT INTO Players (playerName, teamID, jerseyNumber, height, weight) VALUES (?, ?, ?, ?, ?)";
    const response = await db.query(query, [
      playerName, 
      teamID, 
      jerseyNumber, 
      height, 
      weight
    ]);
    res.status(201).json(response);
  } catch (error) {
    console.error(`Error adding player ${playerName} to database:`, error);
    res.status(500).json({ error: "Error creating team." });
  }
};



module.exports = {
  getPlayers,
  getPlayerOptions,
  getPlayerByID,
  createPlayer,
  // updatePlayer,
  // deletePlayer,
};