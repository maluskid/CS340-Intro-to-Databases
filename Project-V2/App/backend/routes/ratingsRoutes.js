const express = require("express");
const router = express.Router();
const {
  getRatings,
  getRatingByID,
  createRating,
  updateRating,
  deleteRating,
} = require("../controllers/ratingsController");

router.get("/", getRatings);
router.get("/:ratingID", getRatingByID);
router.post("/", createRating);
router.put("/:ratingID", updateRating);
router.delete("/:ratingID", deleteRating);

module.exports = router;