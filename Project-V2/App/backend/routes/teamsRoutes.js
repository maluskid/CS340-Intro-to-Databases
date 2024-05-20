const express = require("express");
const router = express.Router();
const {
  getTeams,
  getTeamOptions
  // getPersonByID,
  // createPerson,
  // updatePerson,
  // deletePerson,
} = require("../controllers/teamsController");

router.get("/", getTeams);
router.get("/options", getTeamOptions);
// router.get("/:id", getPersonByID);
// router.post("/", createPerson);
// router.put("/:id", updatePerson);
// router.delete("/:id", deletePerson);

module.exports = router;