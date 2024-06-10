// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of Games 
const getGames = async (req, res) => {
  res.status(200)
  try {
    // Select all rows from the "Games" table
    const query = "SELECT * FROM Games";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching games from the database:", error);
    res.status(500).json({ error: "Error fetching games" });
  }
};

const getGameByID = async (req, res) => {
  res.status(200)
  try {
    const gameID = req.params.gameID;
    const query = "SELECT * FROM Games WHERE gameID = ?";
    const [result] = await db.query(query, [gameID]);
    if (result.length === 0) {
      return res.status(404).json({ error: "Game not found" });
    }
    const game = result[0]
    res.json(game)
  } catch (error) {
    console.error("Error fetching game from the database:", error);
    res.status(500).json({ error: "Error fetching game" });
  }
};


const getGameOptions = async (req, res) => {
  res.status(200)
  try {
    const query = "select Games.gameID, Games.gameDate, TeamsH.teamName as homeTeamName, " +
      "TeamsA.teamName as awayTeamName from Games join Teams TeamsH on Games.homeTeam = " +
      "TeamsH.teamID join Teams TeamsA on Games.awayTeam = TeamsA.teamID";
    const [rows] = await db.query(query);
    res.status(200).json(rows);
    console.log("Game Options successful")

  } catch (error) {
    console.error("Error fetching game options from the database:", error);
    res.status(500).json({ error: "Error fetching game options" });
  }
};

const createGame = async (req, res) => {
  try {
    const { gameDate, homeTeam, awayTeam, homeTeamScore, awayTeamScore, overTime, postSeason } = req.body;

    const overTimeValue = overTime || null;

    const query = "INSERT INTO Games (gameDate, homeTeam, awayTeam, homeTeamScore, awayTeamScore, overTime, postSeason) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const response = await db.query(query, [
      gameDate,
      homeTeam,
      awayTeam,
      homeTeamScore,
      awayTeamScore,
      overTimeValue,
      postSeason,
    ]);
    res.status(201).json(response);
  } catch (error) {
    console.error(`Error adding game to database:`, error);
    res.status(500).json({ error: "Error creating game." });
  }
};

const updateGame = async (req, res) => {
  // make sure this variable name is equal to the parameter name set in
  // 'TablenamePage.jsx'. If www.somepath.com/path/to/resource/:resourceID
  // then use req.params.resourceID to retrieve that parameter
  const gameID = req.params.gameID;
  const updatedGame = req.body;
  try {
    const [data] = await db.query("SELECT * FROM Games WHERE gameID = ?", [gameID]);
    const oldGame = data[0];
    if (!lodash.isEqual(updatedGame, oldGame)) {
      const query = "UPDATE Games SET gameDate = ?, homeTeam = ?, awayTeam = ?, homeTeamScore = ?," +
        "awayTeamScore = ?, overTime = ?, postSeason = ? WHERE gameID = ?";
      await db.query(query, [
        gameDate = updatedGame.gameDate == '' ? oldGame.gameDate : updatedGame.gameDate,
        homeTeam = updatedGame.homeTeam == '' ? oldGame.homeTeam : updatedGame.homeTeam,
        awayTeam = updatedGame.awayTeam == '' ? oldGame.awayTeam : updatedGame.awayTeam,
        homeTeamScore = updatedGame.homeTeamScore == '' ? oldGame.homeTeamScore : updatedGame.homeTeamScore,
        awayTeamScore = updatedGame.awayTeamScore == '' ? oldGame.awayTeamScore : updatedGame.awayTeamScore,
        overTime = updatedGame.overTime == false ? oldGame.overTime : updatedGame.overTime,
        postSeason = updatedGame.postSeason == false ? oldGame.postSeason : updatedGame.postSeason,
        gameID
      ]);
      return res.json({ message: "Game update successful." });
    }
    res.json(({ message: "Update object identical to database object, no update." }))
  } catch (error) {
    console.error("Error updating game in database:", error);
    res.status(500).json({ error: `Error updating game with gameID ${gameID}` });
  }
};

const deleteGame = async (req, res) => {
  const gameID = req.params.gameID;
  console.log("Deleting game with gameID:", gameID);
  try {
    const [exists] = await db.query(
      "SELECT 1 FROM Games WHERE gameID = ?",
      [gameID]
    );
    if (exists.length === 0) {
      return res.status(404).send("Game not found");
    }
    await db.query("DELETE FROM Games WHERE gameID = ?", [gameID]);
    res.status(204).json({ message: `Game with gameID ${gameID} deleted` })
  } catch (error) {
    console.error("Error deleting game from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getGames,
  getGameOptions,
  getGameByID,
  createGame,
  updateGame,
  deleteGame,
};
