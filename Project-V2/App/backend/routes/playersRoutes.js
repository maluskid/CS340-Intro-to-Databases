// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for routes:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

const express = require("express");
const router = express.Router();
const {
  getPlayers,
  getPlayerOptions,
  getPlayerByID,
  createPlayer,
  updatePlayer,
  deletePlayer,
} = require("../controllers/playersController");

// Set up API routes and corresponding functions
router.get("/", getPlayers);
router.get("/options", getPlayerOptions);
router.get("/:playerID", getPlayerByID);
router.post("/", createPlayer);
router.put("/:playerID", updatePlayer);
router.delete("/:playerID", deletePlayer);

module.exports = router;