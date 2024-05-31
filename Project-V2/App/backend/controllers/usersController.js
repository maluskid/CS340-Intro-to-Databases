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

const updateUser = async (req, res) => {
  // make sure this variable name is equal to the parameter name set in
  // 'TablenamePage.jsx'. If www.somepath.com/path/to/resource/:resourceID
  // then use req.params.resourceID to retrieve that parameter
  const userID = req.params.userID;
  const updatedUser = req.body;
  try {
    const [data] = await db.query("SELECT * FROM Users WHERE userID = ?", [userID]);
    const oldUser = data[0];
    if (!lodash.isEqual(updatedUser, oldUser)) {
      const query = "UPDATE Users SET userName = ?, favoritePlayer = ?, favoriteTeam = ? WHERE userID = ?";
      await db.query(query, [
        userName = updatedUser.userName == '' ? oldUser.userName : updatedUser.userName,
        favoritePlayer = updatedUser.favoritePlayer == '' ? oldUser.favoritePlayer : updatedUser.favoritePlayer,
        favoriteTeam = updatedUser.favoriteTeam == '' ? oldUser.favoriteTeam : updatedUser.favoriteTeam,
        userID
      ]);
      return res.json({ message: "User update successful." });
    }
    res.json(({ message: "Update object identical to database object, no update." }))
  } catch (error) {
    console.error("Error updating user in database:", error);
    res.status(500).json({ error: `Error updating user with userID ${userID}` });
  }
};

const deleteUser = async (req, res) => {
  const userID = req.params.userID;
  console.log("Deleting user with userID:", userID);
  try {
    const [exists] = await db.query(
      "SELECT 1 FROM Users WHERE userID = ?",
      [userID]
    );
    if (exists.length === 0) {
      return res.status(404).send("User not found");
    }
    await db.query("DELETE FROM Users WHERE userID = ?", [userID]);
    res.status(204).json({ message: `User with userID ${userID} deleted` })
  } catch (error) {
    console.error("Error deleting user from the database:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getUsers,
  getUserOptions,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
};