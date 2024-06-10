const express = require("express");
const router = express.Router();
const {
  getTeams,
  getTeamOptions,
  getTeamPlayers,
  getTeamByID,
  createTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamsController");

router.get("/", getTeams);
router.get("/options", getTeamOptions);
router.get("/playerlist/:teamID", getTeamPlayers);
router.get("/:teamID", getTeamByID);
router.post("/", createTeam);
router.put("/:teamID", updateTeam);
router.delete("/:teamID", deleteTeam);

module.exports = router;
