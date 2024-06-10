// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for routes:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

const express = require("express");
const router = express.Router();
const {
  getGames,
  getGameOptions,
  getGameByID,
  createGame,
  updateGame,
  deleteGame,
} = require("../controllers/gamesController");

// Set up API routes and corresponding functions
router.get("/", getGames);
router.get("/options", getGameOptions);
router.get("/:gameID", getGameByID);
router.post("/", createGame);
router.put("/:gameID", updateGame);
router.delete("/:gameID", deleteGame);

module.exports = router;
