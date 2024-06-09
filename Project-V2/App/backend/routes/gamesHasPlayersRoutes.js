const express = require("express");
const router = express.Router();
const {
  getGamesHasPlayers,
  getGameHasPlayerByID,
  createGameHasPlayer,
  updateGameHasPlayer,
  // deleteGameHasPlayer
} = require("../controllers/gamesHasPlayersController");

router.get("/", getGamesHasPlayers);
router.get("/:gameHasPlayerID", getGameHasPlayerByID);
router.post("/", createGameHasPlayer);
router.put("/:gameHasPlayerID", updateGameHasPlayer);
// router.delete("/:gameHasPlayerID", deleteGameHasPlayer);

module.exports = router;