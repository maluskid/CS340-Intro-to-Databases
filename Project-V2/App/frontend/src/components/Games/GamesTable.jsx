import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./GamesTableRow";
import axios from "axios";

const GamesTable = () => {
  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "games";
      const response = await axios.get(URL);
      setGames(response.data);
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
              <TableRow key={game.id} game={game} fetchGames={fetchGames} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GamesTable;
