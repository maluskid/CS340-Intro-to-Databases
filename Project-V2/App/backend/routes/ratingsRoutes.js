// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for routes:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

const express = require("express");
const router = express.Router();
const {
  getRatings,
  getRatingByID,
  createRating,
  updateRating,
  deleteRating,
} = require("../controllers/ratingsController");

// Set up API routes and corresponding functions
router.get("/", getRatings);
router.get("/:ratingID", getRatingByID);
router.post("/", createRating);
router.put("/:ratingID", updateRating);
router.delete("/:ratingID", deleteRating);

module.exports = router;