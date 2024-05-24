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
    console.error("Error fetching people from the database:", error);
    res.status(500).json({ error: "Error fetching people" });
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

module.exports = {
  getUsers,
  getUserOptions,
  // getPersonByID,
  // createPerson,
  // updatePerson,
  // deletePerson,
};