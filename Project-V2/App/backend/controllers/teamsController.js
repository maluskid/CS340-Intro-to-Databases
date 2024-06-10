// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for controller:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

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
    const query = "SELECT * FROM Teams";
    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching teams from the database:", error);
    res.status(500).json({ error: "Error fetching teams" });
  }
};

// Returns rows of teams that matches given teamID
const getTeamByID = async (req, res) => {
  res.status(200)
  try {
    const teamID = req.params.teamID;
    const query = "SELECT * FROM Teams WHERE teamID = ?";
    const [result] = await db.query(query, [teamID]);
    if (result.length === 0) {
      return res.status(404).json({ error: "Team not found" });
    }
    const team = result[0]
    res.json(team)
  } catch (error) {
    console.error("Error fetching team from the database:", error);
    res.status(500).json({ error: "Error fetching team" });
  }
};

// Use for dropdown, returns all rows of teams with teamID and teamName
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

// Inserts new team into Teams table
const createTeam = async (req, res) => {
  try {
    const { teamName, coach, wins, losses } = req.body;
    const query = "INSERT INTO Teams (teamName, coach, wins, losses) VALUES (?, ?, ?, ?)";
    const response = await db.query(query, [
      teamName,
      coach,
      wins,
      losses
    ]);
    res.status(201).json(response);
  } catch (error) {
    console.error(`Error adding team ${teamName} to database:`, error);
    res.status(500).json({ error: "Error creating team." });
  }
};

// Updates team that matches given teamID
const updateTeam = async (req, res) => {
  const teamID = req.params.teamID;
  const updatedTeam = req.body;
  try {
    const [data] = await db.query("SELECT * FROM Teams WHERE teamID = ?", [teamID]);
    const oldTeam = data[0];
    if (!lodash.isEqual(updatedTeam, oldTeam)) {
      const query = "UPDATE Teams SET teamName = ?, coach = ?, wins = ?, losses = ? WHERE teamID= ?";
      await db.query(query, [
        teamName = updatedTeam.teamName == '' ? oldTeam.teamName : updatedTeam.teamName,
        coach = updatedTeam.coach == '' ? oldTeam.coach : updatedTeam.coach,
        wins = updatedTeam.wins == '' ? oldTeam.wins : updatedTeam.wins,
        lossess = updatedTeam.losses == '' ? oldTeam.losses : updatedTeam.losses,
        teamID
      ]);
      return res.json({ message: "Team update successful." });
    }
    res.json(({ message: "Update object identical to database object, no update." }))
  } catch (error) {
    console.error("Error updating team in database:", error);
    res.status(500).json({ error: `Error updating team with teamID ${teamID}` });
  }
};

// Deletes team that matches given teamID
const deleteTeam = async (req, res) => {
  const teamID = req.params.teamID;
  console.log("Deleting team with teamID:", teamID);
  try {
    const [exists] = await db.query(
      "SELECT 1 FROM Teams WHERE teamID = ?",
      [teamID]
    );
    if (exists.length === 0) {
      return res.status(404).send("Team not found");
    }
    await db.query("DELETE FROM Teams WHERE teamID = ?", [teamID]);
    res.status(204).json({ message: `Team with teamID ${teamID} deleted` })
  } catch (error) {
    console.error("Error deleting team from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTeams,
  getTeamOptions,
  createTeam,
  getTeamByID,
  updateTeam,
  deleteTeam
};
