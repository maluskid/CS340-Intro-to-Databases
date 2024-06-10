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

function CreateGameHasPlayer() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gameID: "",
    playerID: "",
  });

  const [playerOptions, setPlayerOptions] = useState([]);
  const [gameOptions, setGameOptions] = useState([]);

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
    fetchPlayerOptions();
    fetchGameOptions();
  }, []);

  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new gamehasplayer object from the formData
    const newGameHasPlayer = {
      gameID: formData.gameID,
      playerID: formData.playerID,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "gamesHasPlayers";
      const response = await axios.post(URL, newGameHasPlayer);
      if (response.status === 201) {
        navigate("/gamesHasPlayers");
      } else {
        alert("Error creating GameHasPlayer");
      }
    } catch (error) {
      alert("Error creating GameHasPlayer");
      console.error("Error creating GameHasPlayer:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      gameID: "",
      playerID: "",
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
      <h2>Associate a Player with a Game</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="playerID">Player Name</label>
        <Dropdown
          name="playerID"
          options={playerOptions}
          optionID="playerID"
          optionName="playerName"
          value={formData.playerID}
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
        <button type="submit">Associate Player with Game</button>
      </form>
    </>
  );
}

export default CreateGameHasPlayer;
