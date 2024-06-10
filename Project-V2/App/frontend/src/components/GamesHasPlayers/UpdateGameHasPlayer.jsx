// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for component:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Dropdown from "../dropdown/Dropdown";

const UpdateGameHasPlayer = () => {
  const { gameHasPlayerID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevGameHasPlayer = location.state.gameHasPlayer;

  const [formData, setFormData] = useState({
    gameID: prevGameHasPlayer.gameID || '',
    playerID: prevGameHasPlayer.playerID || '',
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevGameHasPlayer
    if (JSON.stringify(formData) === JSON.stringify({
      gameID: prevGameHasPlayer.gameID || '',
      playerID: prevGameHasPlayer.playerID || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevGameHasPlayer
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "gamesHasPlayers/" + gameHasPlayerID;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating gameHasPlayer");
        } else {
          alert(response.data.message);
          // Redirect to gamesHasPlayers page
          navigate("/gamesHasPlayers");
        }
      } catch (err) {
        console.log("Error updating GameHasPlayer:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update GameHasPlayer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Game:</label>
          <Dropdown
          name="gameID"
          options={gameOptions}
          optionID="gameID"
          optionName="gameName"
          value={formData.gameID}
          onChange={handleInputChange}
        />
        </div>
        <div>
          <label>Player:</label>
          <Dropdown
          name="playerID"
          options={playerOptions}
          optionID="playerID"
          optionName="playerName"
          value={formData.playerID}
          onChange={handleInputChange}
        />
        </div>
        <button type="button" onClick={() => navigate("/gamesHasPlayers")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateGameHasPlayer;

