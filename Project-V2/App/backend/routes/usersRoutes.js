// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for routes:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

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

// Set up API routes and corresponding functions
router.get("/", getUsers);
router.get("/options", getUserOptions);
router.get("/:userID", getUserByID);
router.post("/", createUser);
router.put("/:userID", updateUser);
router.delete("/:userID", deleteUser);

module.exports = router;