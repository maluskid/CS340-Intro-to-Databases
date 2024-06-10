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


const UpdateRating = () => {
  const { ratingID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevRating = location.state.rating;

  const [formData, setFormData] = useState({
    userID: prevRating.userID || '',
    gameID: prevRating.gameID || '',
    rating: prevRating.rating || '',
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
      // [name]: type === 'checkbox' ? checked : value,
    }));
  };

  function isUpdate() {
    if (JSON.stringify(formData) === JSON.stringify({
      userID: prevRating.userID || '',
      gameID: prevRating.gameID || '',
      rating: prevRating.rating || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isUpdate()) {
      try {
        const URL = import.meta.env.VITE_API_URL + "ratings/" + ratingID;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating rating");
        } else {
          alert(response.data.message);
          navigate("/ratings");
        }
      } catch (err) {
        console.log("Error updating rating:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update Rating</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <Dropdown
            name="userID"
            options={userOptions}
            optionID="userID"
            optionName="userName"
            value={formData.userID}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Game:</label>
          <Dropdown
            name="gameID"
            options={gameOptions}
            optionID="gameID"
            optionName="gameName"
            value={formData.gameID}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            onChange={handleInputChange}
            required
            defaultValue={prevRating.rating}
          />
        </div>
        <button type="button" onClick={() => navigate("/ratings")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateRating;
