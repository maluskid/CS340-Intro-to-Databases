const express = require("express");
const router = express.Router();
const {
  getTeams,
  // getPersonByID,
  // createPerson,
  // updatePerson,
  // deletePerson,
} = require("../controllers/teamsController");

router.get("/", getTeams);
// router.get("/:id", getPersonByID);
// router.post("/", createPerson);
// router.put("/:id", updatePerson);
// router.delete("/:id", deletePerson);

module.exports = router;