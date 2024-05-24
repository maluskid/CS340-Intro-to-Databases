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

// Returns a single team by their unique ID from Teams
const getTeamByID = async (req, res) => {
  try {
    const teamID = req.params.teamID;
    const query = "SELECT * FROM Teams WHERE teamID = ?";
    const [result] = await db.query(query, [teamID]);
    // Check if team was found
    if (result.length === 0) {
      return res.status(404).json({ error: "Team not found" });
    }
    const team = result[0];
    res.json(team);
  } catch (error) {
    console.error("Error fetching team from the database:", error);
    res.status(500).json({ error: "Error fetching team" });
  }
};

const createTeam = async (req, res) => {
  try {
    const { teamName, coach, wins, losses } = req.body;
    const query =
      "INSERT INTO Teams (teamName, coach, wins, losses) VALUES (?, ?, ?, ?)";

    const response = await db.query(query, [
      teamName,
      coach,
      wins,
      losses,
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating team:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating team" });
  }
};

const updateTeam = async (req, res) => {
  // Get the team ID
  const teamID = req.params.teamID;
  // Get the team object
  const newTeam = req.body;

  try {
    const [data] = await db.query("SELECT * FROM Teams WHERE teamID = ?", [
      teamID,
    ]);

    const oldTeam = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newTeam, oldTeam)) {
      const query =
        "UPDATE Teams SET teamName=?, coach=?, wins=?, losses=? WHERE teamID=?";

      const values = [
        newTeam.teamName,
        newTeam.coach,
        newTeam.wins,
        newTeam.losses,
        teamID,
      ];

      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Team updated successfully." });
    }

    res.json({ message: "Team details are the same, no update" });
  } catch (error) {
    console.log("Error updating team", error);
    res
      .status(500)
      .json({ error: `Error updating the team with id ${teamID}` });
  }
};


// Endpoint to delete a team from the database
const deleteTeam = async (req, res) => {
  console.log("Deleting team with id:", req.params.teamID);
  const teamID = req.params.teamID;

  try {
    // Ensure the team exitst
    const [isExisting] = await db.query(
      "SELECT 1 FROM Teams WHERE teamID = ?",
      [teamID]
    );

    // If the team doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Team not found");
    }

    // Delete the team from Teams
    await db.query("DELETE FROM Teams WHERE teamID = ?", [teamID]);

    // Return the appropriate status code
    res.status(204).json({ message: "Team deleted successfully" })
  } catch (error) {
    console.error("Error deleting team from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTeams,
  getTeamOptions,
  getTeamByID,
  createTeam,
  updateTeam,
  deleteTeam,
};