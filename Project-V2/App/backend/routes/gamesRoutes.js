const express = require("express");
const router = express.Router();
const {
  getGames,
  getGameOptions,
  // getPersonByID,
  // createPerson,
  // updatePerson,
  // deletePerson,
} = require("../controllers/gamesController");

router.get("/", getGames);
router.get("/options", getGameOptions);
// router.get("/:id", getPersonByID);
// router.post("/", createPerson);
// router.put("/:id", updatePerson);
// router.delete("/:id", deletePerson);

module.exports = router;