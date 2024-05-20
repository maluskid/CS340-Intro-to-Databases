const express = require("express");
const router = express.Router();
const {
  getPlayers,
  getPlayerOptions,
  // getPersonByID,
  // createPerson,
  // updatePerson,
  // deletePerson,
} = require("../controllers/playersController");

router.get("/", getPlayers);
router.get("/options", getPlayerOptions);
// router.get("/:id", getPersonByID);
// router.post("/", createPerson);
// router.put("/:id", updatePerson);
// router.delete("/:id", deletePerson);

module.exports = router;