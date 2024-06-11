// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for component:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./GamesTableRow";
import axios from "axios";

const GamesTable = () => {
  const [games, setGames] = useState([]);

  const fetchTeamOptions = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "teams/options";
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      alert(`Error fetching team options for game table`);
      console.log(error);
    }
  };

  const fetchGameOptions = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "games/options";
      const response = await axios.get(URL);
      return response.data.map(game => ({
        gameID: game.gameID,
        gameName: `${game.gameDate.slice(0, 10)}: ${game.homeTeamName} vs ${game.awayTeamName}`
      }));
    } catch (error) {
      alert("Error fetching game options from the server.");
      console.error("Error fetching game options:", error);
    }
  };

  const fetchGames = async () => {
    try {
      const teamOptions = await fetchTeamOptions();
      const gameOptions = await fetchGameOptions();
      const URL = import.meta.env.VITE_API_URL + "games";
      const response = await axios.get(URL);
      const output = response.data.map((value) => ({
        ...value,
        gameName: gameOptions.find((game) => game.gameID === value.gameID).gameName,
        homeTeamID: value.homeTeam,
        awayTeamID: value.awayTeam,
        homeTeam: teamOptions.find((team) => team.teamID === value.homeTeam).teamName,
        awayTeam: teamOptions.find((team) => team.teamID === value.awayTeam).teamName,
      }));
      setGames(output);
    } catch (error) {
      alert("Error fetching games from the server.");
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div>
      <h2>Games Table</h2>
      {games.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No games found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Game ID</th>
              <th>Game</th>
              <th>Date</th>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Home Team Score</th>
              <th>Away Team Score</th>
              <th>Overtime</th>
              <th>Post Season</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <TableRow key={game.gameID} game={game} fetchGames={fetchGames} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GamesTable;
