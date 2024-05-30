const express = require("express");
const router = express.Router();
const {
  getGames,
  getGameOptions,
  getGameByID,
  createGame,
  // updateGame,
  // deleteGame,
} = require("../controllers/gamesController");

router.get("/", getGames);
router.get("/options", getGameOptions);
router.get("/:gameID", getGameByID);
router.post("/", createGame);
// router.put("/:gameID", updateGame);
// router.delete("/:gameID", deleteGame);

module.exports = router;
