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


const UpdatePlayer = () => {
  const { playerID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevPlayer = location.state.player;

  const [formData, setFormData] = useState({
    playerName: prevPlayer.playerName || '',
    teamID: prevPlayer.teamID || '',
    jerseyNumber: prevPlayer.jerseyNumber || '',
    height: prevPlayer.height || '',
    weight: prevPlayer.weight || '',
  });

  const [teamOptions, setTeamOptions] = useState([]);

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

  useEffect(() => {
    fetchTeamOptions();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  function isUpdate() {
    if (JSON.stringify(formData) === JSON.stringify({
      playerName: prevPlayer.playerName || '',
      teamID: prevPlayer.teamID || '',
      jerseyNumber: prevPlayer.jerseyNumber || '',
      height: prevPlayer.height || '',
      weight: prevPlayer.weight || '',
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
        const URL = import.meta.env.VITE_API_URL + "players/" + playerID;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating player");
        } else {
          alert(response.data.message);
          navigate("/players");
        }
      } catch (err) {
        console.log("Error updating player:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update Player</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Player Name</label>
          <input
            type="text"
            name="playerName"
            onChange={handleInputChange}
            required
            value={formData.playerName}
          />
        </div>
        <div>
          <label>Team:</label>
          <Dropdown
            name="teamID"
            options={teamOptions}
            optionID="teamID"
            optionName="teamName"
            value={formData.teamID}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Jersey Number:</label>
          <input
            type="number"
            name="jerseyNumber"
            onChange={handleInputChange}
            required
            defaultValue={prevPlayer.jerseyNumber}
          />
        </div>
        <div>
          <label>Height:</label>
          <input
            type="text"
            name="height"
            onChange={handleInputChange}
            required
            defaultValue={prevPlayer.height}
          />
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="number"
            name="weight"
            onChange={handleInputChange}
            defaultValue={prevPlayer.weight}
          />
        </div>
        <button type="button" onClick={() => navigate("/players")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdatePlayer;
