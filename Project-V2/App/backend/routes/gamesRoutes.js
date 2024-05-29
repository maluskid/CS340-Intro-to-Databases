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

router.get("/", getGames);
router.get("/options", getGameOptions);
router.get("/:id", getGameByID);
router.post("/", createGame);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);

module.exports = router;
