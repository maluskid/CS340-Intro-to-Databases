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

function CreateRating() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userID: "",
    gameID: "",
    rating: "",
  });

  const [userOptions, setUserOptions] = useState([]);
  const [gameOptions, setGameOptions] = useState([]);

  const fetchUserOptions = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "users/options";
      const response = await axios.get(URL);
      setUserOptions(response.data);
    } catch (error) {
      alert("Error fetching user options from the server.");
      console.error("Error fetching user options:", error);
    }
  };

  const fetchGameOptions = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "games/options";
      const response = await axios.get(URL);
      
      const gameOptions = response.data.map(game => ({
        gameID: game.gameID,
        gameName: `${game.gameDate.slice(0, 10)}: ${game.homeTeamName} vs ${game.awayTeamName}`
      }));

      setGameOptions(gameOptions);
    } catch (error) {
      alert("Error fetching game options from the server.");
      console.error("Error fetching game options:", error);
    }
  };

  useEffect(() => {
    fetchUserOptions();
    fetchGameOptions();
  }, []);
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new rating object from the formData
    const newRating = {
      userID: formData.userID,
      gameID: formData.gameID,
      rating: formData.rating
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "ratings";
      const response = await axios.post(URL, newRating);
      if (response.status === 201) {
        navigate("/ratings");
      } else {
        alert("Error creating rating");
      }
    } catch (error) {
      alert("Error creating rating");
      console.error("Error creating rating:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      userID: "",
      gameID: "",
      rating: "",
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
      <h2>Create Rating</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userID">Username</label>
        <Dropdown
          name="userID"
          options={userOptions}
          optionID="userID"
          optionName="userName"
          value={formData.userID}
          onChange={handleInputChange}
        />
        <label htmlFor="gameID">Game</label>
        <Dropdown
          name="gameID"
          options={gameOptions}
          optionID="gameID"
          optionName="gameName"
          value={formData.gameID}
          onChange={handleInputChange}
        />
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          name="rating"
          defaultValue={formData.rating}
          onChange={handleInputChange}
        />
        <button type="submit">Create Rating</button>
      </form>
    </>
  );
}

export default CreateRating;
