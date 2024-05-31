const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserOptions,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

router.get("/", getUsers);
router.get("/options", getUserOptions);
router.get("/:userID", getUserByID);
router.post("/", createUser);
router.put("/:userID", updateUser);
router.delete("/:userID", deleteUser);

module.exports = router;