// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of Teams 
const getTeams = async (req, res) => {
  res.status(200)
  try {
    // Select all rows from the "Teams" table
    const query = "SELECT * FROM Teams";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching teams from the database:", error);
    res.status(500).json({ error: "Error fetching teams" });
  }
};

// Use for dropdown
const getTeamOptions = async (req, res) => {
  res.status(200)
  try {
    const query = "SELECT teamID, teamName FROM Teams";
    const [rows] = await db.query(query)
    res.status(200).json(rows);
    console.log("Team Options successful")
  } catch (error) {
    console.error("Error fetching teams from the database:", error);
    res.status(500).json({ error: "Error fetching team options" });
  }
};

const createTeam = async (req, res, { teamName, coach, wins, losses }) => {
  res.status(200)
  try {
    var query = "INSERT INTO Teams (teamName, coach, wins, losses)";
    query += ' values("' + teamName + '", "' + coach, '", ' + wins, + ', ' + losses + ')'
    console.log(`The SQL query sent was: ${query}`);
    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error(`Error adding team ${teamName} to database:`, error);
    res.status(500).json({ error: "Error creating Team." });
  }
}

const getTeamByID = async (req, res, id) => {
  res.status(200)
  try {
    const query = "SELECT teamID, teamName, coach, wins, losses FROM Teams where teamID=" + id;
    const [rows] = await db.query(query)
    res.status(200).json(rows);
    console.log("Team Options successful")
  } catch (error) {
    console.error("Error fetching teams from the database:", error);
    res.status(500).json({ error: "Error fetching team options" });
  }
}


module.exports = {
  getTeams,
  getTeamOptions,
  createTeam,
  getTeamByID,
  // updatePerson,
  // deletePerson,
};
