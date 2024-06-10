// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for routes:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

const express = require("express");
const router = express.Router();
const {
  getTeams,
  getTeamOptions,
  getTeamByID,
  createTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamsController");

// Set up API routes and corresponding functions
router.get("/", getTeams);
router.get("/options", getTeamOptions);
router.get("/:teamID", getTeamByID);
router.post("/", createTeam);
router.put("/:teamID", updateTeam);
router.delete("/:teamID", deleteTeam);

module.exports = router;
