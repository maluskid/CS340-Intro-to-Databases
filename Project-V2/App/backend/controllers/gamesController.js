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

// Returns all rows of Games 
const getGames = async (req, res) => {
  res.status(200)
  try {
    const query = "SELECT * FROM Games";
    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching games from the database:", error);
    res.status(500).json({ error: "Error fetching games" });
  }
};

// Returns rows of games that match with given gameID
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

// Use for dropdown, Returns rows of games along with corresponding dates and team names
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

// Inserts game into database
const createGame = async (req, res) => {
  try {
    const { gameDate, homeTeam, awayTeam, homeTeamScore, awayTeamScore, overTime, postSeason } = req.body;

    const postSeasonValue = postSeason || null;
    const overTimeValue = overTime || null;

    const query = "INSERT INTO Games (gameDate, homeTeam, awayTeam, homeTeamScore, awayTeamScore, overTime, postSeason) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const response = await db.query(query, [
      gameDate,
      homeTeam,
      awayTeam,
      homeTeamScore,
      awayTeamScore,
      overTimeValue,
      postSeasonValue,
    ]);
    res.status(201).json(response);
  } catch (error) {
    console.error(`Error adding game to database:`, error);
    res.status(500).json({ error: "Error creating game." });
  }
};

// Updates game that matches given gameID
const updateGame = async (req, res) => {
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
        overTime = updatedGame.overTime == '' ? oldGame.overTime : updatedGame.overTime,
        updatedGame.postSeason,
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

// Deletes game that matches given gameID
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
