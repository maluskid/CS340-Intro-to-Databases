import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./UsersTableRow";
import axios from "axios";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  const fetchPlayerOptions = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "players/options";
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      alert(`Error fetching player options for users table`);
      console.log(error);
    }
  };

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

  const fetchUsers = async () => {
    try {
      const teamOptions = await fetchTeamOptions();
      const playerOptions = await fetchPlayerOptions();
      const URL = import.meta.env.VITE_API_URL + "users";
      const response = await axios.get(URL);
      console.log(`users ${JSON.stringify(response.data)}`);
      const output = response.data.map((user) => ({
        ...user,
        favoritePlayer:
          user.favoritePlayer === null ? null : playerOptions.find((player) => player.playerID === user.favoritePlayer).playerName,
        favoriteTeam:
          user.favoriteTeam === null ? null : teamOptions.find((team) => team.teamID === user.favoriteTeam).teamName,
      }));
      setUsers(output);
    } catch (error) {
      alert("Error fetching users from the server.");
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users Table</h2>
      {users.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No users found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Favorite Player</th>
              <th>Favorite Team</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <TableRow key={user.userID} user={user} fetchUsers={fetchUsers} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersTable;
