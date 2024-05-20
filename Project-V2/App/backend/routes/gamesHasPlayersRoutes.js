const express = require("express");
const router = express.Router();
const {
  getGamesHasPlayers,
  // getPersonByID,
  // createPerson,
  // updatePerson,
  // deletePerson,
} = require("../controllers/gamesHasPlayersController");

router.get("/", getGamesHasPlayers);
// router.get("/:id", getPersonByID);
// router.post("/", createPerson);
// router.put("/:id", updatePerson);
// router.delete("/:id", deletePerson);

module.exports = router;