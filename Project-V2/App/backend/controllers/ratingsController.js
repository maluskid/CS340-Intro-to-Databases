// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for controller:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of Ratings 
const getRatings = async (req, res) => {
  res.status(200)
  try {
    const query = "SELECT * FROM Ratings";
    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching people from the database:", error);
    res.status(500).json({ error: "Error fetching people" });
  }
};

// Returns rows of ratings that matches given ratingID
const getRatingByID = async (req, res) => {
  res.status(200)
  try {
    const ratingID = req.params.ratingID;
    const query = "SELECT * FROM Ratings WHERE ratingID = ?";
    const [result] = await db.query(query, [ratingID]);
    if (result.length === 0) {
      return res.status(404).json({ error: "Rating not found" });
    }
    const rating = result[0]
    res.json(rating)
  } catch (error) {
    console.error("Error fetching rating from the database:", error);
    res.status(500).json({ error: "Error fetching rating" });
  }
};

// Inserts new rating into Ratings table
const createRating = async (req, res) => {
  try {
    const { userID, gameID, rating } = req.body;
    const query = "INSERT INTO Ratings (userID, gameID, rating) VALUES (?, ?, ?)";
    const response = await db.query(query, [
      userID,
      gameID,
      rating
    ]);
    res.status(201).json(response);
  } catch (error) {
    console.error(`Error adding rating to database:`, error);
    res.status(500).json({ error: "Error creating rating." });
  }
};

// Updates rating that matches given ratingID
const updateRating = async (req, res) => {
  const updatedRating = req.body;
  try {
    const [data] = await db.query("SELECT * FROM Ratings WHERE ratingID = ?", [ratingID]);
    const oldRating = data[0];
    if (!lodash.isEqual(updatedRating, oldRating)) {
      const query = "UPDATE Ratings SET userID = ?, gameID = ?, rating = ? WHERE ratingID= ?";
      await db.query(query, [
        userID = updatedRating.userID == '' ? oldRating.userID : updatedRating.userID,
        gameID = updatedRating.gameID == '' ? oldRating.gameID : updatedRating.gameID,
        rating = updatedRating.rating == '' ? oldRating.rating : updatedRating.rating,
        ratingID
      ]);
      return res.json({ message: "Rating update successful." });
    }
    res.json(({ message: "Update object identical to database object, no update." }))
  } catch (error) {
    console.error("Error updating rating in database:", error);
    res.status(500).json({ error: `Error updating rating with ratingID ${ratingID}` });
  }
};

// Deletes rating that matches given ratingID
const deleteRating = async (req, res) => {
  const ratingID = req.params.ratingID;
  console.log("Deleting rating with ratingID:", ratingID);
  try {
    const [exists] = await db.query(
      "SELECT 1 FROM Ratings WHERE ratingID = ?",
      [ratingID]
    );
    if (exists.length === 0) {
      return res.status(404).send("Rating not found");
    }
    await db.query("DELETE FROM Ratings WHERE ratingID = ?", [ratingID]);
    res.status(204).json({ message: `Rating with ratingID ${ratingID} deleted` })
  } catch (error) {
    console.error("Error deleting rating from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRatings,
  getRatingByID,
  createRating,
  updateRating,
  deleteRating,
};
