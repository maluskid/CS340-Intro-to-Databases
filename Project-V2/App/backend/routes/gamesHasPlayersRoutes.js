// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for routes:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

const express = require("express");
const router = express.Router();
const {
  getGamesHasPlayers,
  getGameHasPlayerByID,
  createGameHasPlayer,
  updateGameHasPlayer,
  deleteGameHasPlayer
} = require("../controllers/gamesHasPlayersController");

// Set up API routes and corresponding functions
router.get("/", getGamesHasPlayers);
router.get("/:gameHasPlayerID", getGameHasPlayerByID);
router.post("/", createGameHasPlayer);
router.put("/:gameHasPlayerID", updateGameHasPlayer);
router.delete("/:gameHasPlayerID", deleteGameHasPlayer);

module.exports = router;