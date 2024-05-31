// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of Users 
const getUsers = async (req, res) => {
  res.status(200)
  try {
    // Select all rows from the "Users" table
    const query = "SELECT * FROM Users";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching user from the database:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
};

// Use for dropdown
const getUserOptions = async (req, res) => {
  res.status(200)
  try {
    const query = "SELECT userID, userName FROM Users";
    const [rows] = await db.query(query)
    res.status(200).json(rows);
    console.log("User Options successful")
  } catch (error) {
    console.error("Error fetching user options from the database:", error);
    res.status(500).json({ error: "Error fetching user options" });
  }
};

const getUserByID = async (req, res) => {
  res.status(200)
  try {
    const userID = req.params.userID;
    const query = "SELECT * FROM Users WHERE userID = ?";
    const [result] = await db.query(query, [userID]);
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = result[0]
    res.json(user)
  } catch (error) {
    console.error("Error fetching user from the database:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, favoritePlayer, favoriteTeam } = req.body;
    
    const favoritePlayerValue = favoritePlayer || null;
    const favoriteTeamValue = favoriteTeam || null;

    const query = "INSERT INTO Users (userName, favoritePlayer, favoriteTeam) VALUES (?, ?, ?)";
    const response = await db.query(query, [
      userName,
      favoritePlayerValue,
      favoriteTeamValue
    ]);
    res.status(201).json(response);
  } catch (error) {
    console.error(`Error adding user to database:`, error);
    res.status(500).json({ error: "Error creating user." });
  }
};



module.exports = {
  getUsers,
  getUserOptions,
  getUserByID,
  createUser,
  // updateUser,
  // deleteUser,
};