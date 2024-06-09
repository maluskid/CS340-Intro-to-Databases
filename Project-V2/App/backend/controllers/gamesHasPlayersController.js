// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of GamesHasPlayers 
const getGamesHasPlayers = async (req, res) => {
  res.status(200)
  try {
    // Select all rows from the "GamesHasPlayers" table
    const query = "SELECT * FROM Games_Has_Players";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching people from the database:", error);
    res.status(500).json({ error: "Error fetching people" });
  }
};

const getGameHasPlayerByID = async (req, res) => {
  res.status(200)
  try {
    const gameHasPlayerID = req.params.gameHasPlayerID;
    const query = "SELECT * FROM Games_Has_Players WHERE gameHasPlayerID = ?";
    const [result] = await db.query(query, [gameHasPlayerID]);
    if (result.length === 0) {
      return res.status(404).json({ error: "GameHasPlayer not found" });
    }
    const gameHasPlayer = result[0]
    res.json(gameHasPlayer)
  } catch (error) {
    console.error("Error fetching GameHasPlayer from the database:", error);
    res.status(500).json({ error: "Error fetching GameHasPlayer" });
  }
};

const createGameHasPlayer = async (req, res) => {
  try {
    const { gameID, playerID } = req.body;
    const query = "INSERT INTO Games_Has_Players (gameID, playerID) VALUES (?, ?)";
    const response = await db.query(query, [
      gameID,
      playerID
    ]);
    res.status(201).json(response);
  } catch (error) {
    console.error(`Error adding GameHasPlayer to database:`, error);
    res.status(500).json({ error: "Error creating GameHasPlayer." });
  }
};

const updateGameHasPlayer = async (req, res) => {
  // make sure this variable name is equal to the parameter name set in
  // 'TablenamePage.jsx'. If www.somepath.com/path/to/resource/:resourceID
  // then use req.params.resourceID to retrieve that parameter
  const gameHasPlayerID = req.params.gameHasPlayerID;
  const updatedGameHasPlayer = req.body;
  try {
    const [data] = await db.query("SELECT * FROM Games_Has_Players WHERE gameHasPlayerID = ?", [gameHasPlayerID]);
    const oldGameHasPlayer = data[0];
    if (!lodash.isEqual(updatedGameHasPlayer, oldGameHasPlayer)) {
      const query = "UPDATE Games_Has_Players SET gameID = ?, playerID = ? WHERE gameHasPlayerID = ?";
      await db.query(query, [
        gameID = updatedGameHasPlayer.gameID == '' ? oldGameHasPlayer.gameID : updatedGameHasPlayer.gameID,
        playerID = updatedGameHasPlayer.playerID == '' ? oldGameHasPlayer.playerID : updatedGameHasPlayer.playerID,
        gameHasPlayerID
      ]);
      return res.json({ message: "GameHasPlayer update successful." });
    }
    res.json(({ message: "Update object identical to database object, no update." }))
  } catch (error) {
    console.error("Error updating GameHasPlayer in database:", error);
    res.status(500).json({ error: `Error updating GameHasPlayer with gameHasPlayerID ${gameHasPlayerID}` });
  }
};

const deleteGameHasPlayer = async (req, res) => {
  const gameHasPlayerID = req.params.gameHasPlayerID;
  console.log("Deleting GameHasPlayer with gameHasPlayerID:", gameHasPlayerID);
  try {
    const [exists] = await db.query(
      "SELECT 1 FROM Games_Has_Players WHERE gameHasPlayerID = ?",
      [gameHasPlayerID]
    );
    if (exists.length === 0) {
      return res.status(404).send("GameHasPlayer not found");
    }
    await db.query("DELETE FROM Games_Has_Players WHERE gameHasPlayerID = ?", [gameHasPlayerID]);
    res.status(204).json({ message: `GameHasPlayer with gameHasPlayerID ${gameHasPlayerID} deleted` })
  } catch (error) {
    console.error("Error deleting GameHasPlayer from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getGamesHasPlayers,
  getGameHasPlayerByID,
  createGameHasPlayer,
  updateGameHasPlayer,
  deleteGameHasPlayer
};