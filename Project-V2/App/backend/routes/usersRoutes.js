const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserOptions,
  // getPersonByID,
  // createPerson,
  // updatePerson,
  // deletePerson,
} = require("../controllers/usersController");

router.get("/", getUsers);
router.get("/options", getUserOptions);
// router.get("/:id", getPersonByID);
// router.post("/", createPerson);
// router.put("/:id", updatePerson);
// router.delete("/:id", deletePerson);

module.exports = router;