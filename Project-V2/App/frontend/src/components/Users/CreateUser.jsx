// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for component:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dropdown from "../dropdown/Dropdown";

function CreateUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    favoritePlayer: "",
    favoriteTeam: "",
  });
  
  const [teamOptions, setTeamOptions] = useState([]);
  const [playerOptions, setPlayerOptions] = useState([]);

  const fetchTeamOptions = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "teams/options";
      const response = await axios.get(URL);
      setTeamOptions(response.data);
    } catch (error) {
      alert("Error fetching team options from the server.");
      console.error("Error fetching team options:", error);
    }
  };

  const fetchPlayerOptions = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "players/options";
      const response = await axios.get(URL);
      setPlayerOptions(response.data);
    } catch (error) {
      alert("Error fetching team options from the server.");
      console.error("Error fetching team options:", error);
    }
  };

  useEffect(() => {
    fetchTeamOptions();
    fetchPlayerOptions();
  }, []);

  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new user object from the formData
    const newUser = {
      userName: formData.userName,
      favoritePlayer: formData.favoritePlayer,
      favoriteTeam: formData.favoriteTeam,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "users";
      const response = await axios.post(URL, newUser);
      if (response.status === 201) {
        navigate("/users");
      } else {
        alert("Error creating user");
      }
    } catch (error) {
      alert("Error creating user");
      console.error("Error creating user:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      userName: "",
      favoritePlayer: "",
      favoriteTeam: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">User Name</label>
        <input
          type="text"
          name="userName"
          defaultValue={formData.userName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="favoritePlayer">Favorite Player</label>
        <Dropdown
          name="favoritePlayer"
          options={playerOptions}
          optionID="playerID"
          optionName="playerName"
          value={formData.favoritePlayer}
          onChange={handleInputChange}
        />
        <label htmlFor="favoriteTeam">Favorite Team</label>
        <Dropdown
          name="favoriteTeam"
          options={teamOptions}
          optionID="teamID"
          optionName="teamName"
          value={formData.favoriteTeam}
          onChange={handleInputChange}
        />
        <button type="submit">Create User</button>
      </form>
    </>
  );
}

export default CreateUser;
