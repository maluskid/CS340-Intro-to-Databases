import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./PlayersTableRow";
import axios from "axios";

const PlayersTable = () => {
  const [players, setPlayers] = useState([]);

  const fetchPlayers = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "players";
      const response = await axios.get(URL);
      setPlayers(response.data);
    } catch (error) {
      alert("Error fetching players from the server.");
      console.error("Error fetching players:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div>
      <h2>Players Table</h2>
      {players.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No players found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Player ID</th>
              <th>Player Name</th>
              <th>Team ID</th>
              <th>Team Name</th>
              <th>Jersey Number</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <TableRow key={player.playerID} player={player} fetchPlayers={fetchPlayers} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlayersTable;
