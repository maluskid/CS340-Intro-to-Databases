import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./TeamsTableRow";
import axios from "axios";

const TeamsTable = () => {
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "teams";
      const response = await axios.get(URL);
      setTeams(response.data);
    } catch (error) {
      alert("Error fetching teams from the server.");
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div>
      <h2>Teams Table</h2>
      {teams.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No teams found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Team ID</th>
              <th>Team Name</th>
              <th>Coach</th>
              <th>Current Record</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <TableRow key={team.id} team={team} fetchTeams={fetchTeams} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeamsTable;
