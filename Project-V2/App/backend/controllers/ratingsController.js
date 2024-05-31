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

const updateRating = async (req, res) => {
  // make sure this variable name is equal to the parameter name set in
  // 'TablenamePage.jsx'. If www.somepath.com/path/to/resource/:resourceID
  // then use req.params.resourceID to retrieve that parameter
  const ratingID = req.params.ratingID;
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

module.exports = {
  getRatings,
  getRatingByID,
  createRating,
  updateRating,
  // deleteRating,
};