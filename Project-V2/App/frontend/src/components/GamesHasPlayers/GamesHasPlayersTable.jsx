import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./GamesHasPlayersTableRow";
import axios from "axios";

const GamesHasPlayersTable = () => {
  const [gamesHasPlayers, setGamesHasPlayers] = useState([]);

  const fetchGamesHasPlayers = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "gamesHasPlayers";
      const response = await axios.get(URL);
      setGamesHasPlayers(response.data);
    } catch (error) {
      alert("Error fetching gamesHasPlayers from the server.");
      console.error("Error fetching gamesHasPlayers:", error);
    }
  };

  useEffect(() => {
    fetchGamesHasPlayers();
  }, []);

  return (
    <div>
      <h2>GamesHasPlayers Table</h2>
      {gamesHasPlayers.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No gameshasplayers found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Game ID</th>
              <th>Player ID</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {gamesHasPlayers.map((gamesHasPlayers) => (
              <TableRow key={gamesHasPlayers.id} gamesHasPlayers={gamesHasPlayers} fetchGamesHasPlayers={fetchGamesHasPlayers} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GamesHasPlayersTable;
