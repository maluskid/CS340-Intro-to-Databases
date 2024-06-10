// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for component:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./UsersTableRow";
import axios from "axios";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "users";
      const response = await axios.get(URL);
      setUsers(response.data);
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
