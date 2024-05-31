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
    // Select all rows from the "Ratings" table
    const query = "SELECT * FROM Ratings";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching people from the database:", error);
    res.status(500).json({ error: "Error fetching people" });
  }
};

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

module.exports = {
  getRatings,
  getRatingByID,
  createRating,
  // updateRating,
  // deleteRating,
};