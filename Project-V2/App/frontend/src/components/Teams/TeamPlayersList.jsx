import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const TeamPlayersList = () => {

  const { teamID } = useParams();
  const location = useLocation();
  const team = location.state.team;

  const fetchPlayers = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "teams/playerlist/" + teamID;
      const response = await axios.get(URL);
      const players = response.data.map((player) => {
        player.playerName
      });
      console.log(`${players}`)
      return players;
    } catch (error) {
      alert("Error fetching team player list from the server.");
      console.error("Error fetching teams:", error);
    }
  };

  const players = fetchPlayers();

  return (
    <div>
      <h2>Player List for {team.teamName}</h2>
      {players.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No players associated with {team.teamName} found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {players.forEach((player) => (
              <tr>
                <td>{player}</td>
              </tr>))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeamPlayersList;
