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


router.get("/", getPlayers);
router.get("/options", getPlayerOptions);
router.get("/:playerID", getPlayerByID);
router.post("/", createPlayer);
router.put("/:playerID", updatePlayer);
router.delete("/:playerID", deletePlayer);

module.exports = router;