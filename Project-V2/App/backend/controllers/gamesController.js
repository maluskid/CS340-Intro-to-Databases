// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of Games 
const getGames = async (req, res) => {
  res.status(200)
  try {
    // Select all rows from the "Teams" table
    const query = "SELECT * FROM Games";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching people from the database:", error);
    res.status(500).json({ error: "Error fetching people" });
  }
};

const getGameOptions = async (req, res) => {
  res.status(200)
  try {
    const query = "select Games.gameID, Games.gameDate, TeamsH.teamName as homeTeamName, TeamsA.teamName as awayTeamName from Games join Teams TeamsH on Games.homeTeam = TeamsH.teamID join Teams TeamsA on Games.awayTeam = TeamsA.teamID";
    const [rows] = await db.query(query);
    res.status(200).json(rows);
    console.log("Game Options successful")

  } catch (error) {
    console.error("Error fetching game options from the database:", error);
    res.status(500).json({ error: "Error fetching game options" });
  }
};

module.exports = {
  getGames,
  getGameOptions,
  // getPersonByID,
  // createPerson,
  // updatePerson,
  // deletePerson,
};