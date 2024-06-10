import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Dropdown from "../dropdown/Dropdown";


const UpdateGame = () => {
  const { gameID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevGame = location.state.game;

  const [formData, setFormData] = useState({
    gameDate: prevGame.gameDate.slice(0, 10) || '',
    homeTeam: prevGame.homeTeam || '',
    awayTeam: prevGame.awayTeam || '',
    homeTeamScore: prevGame.homeTeamScore || '',
    awayTeamScore: prevGame.awayTeamScore || '',
    overTime: prevGame.overTime || false,
    postSeason: prevGame.postSeason || false,
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
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  function isUpdate() {
    if (JSON.stringify(formData) === JSON.stringify({
      gameDate: prevGame.gameDate.slice(0, 10) || '',
      homeTeam: prevGame.homeTeam || '',
      awayTeam: prevGame.awayTeam || '',
      homeTeamScore: prevGame.homeTeamScore || '',
      awayTeamScore: prevGame.awayTeamScore || '',
      overTime: prevGame.overTime || false,
      postSeason: prevGame.postSeason || false,
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
        const URL = import.meta.env.VITE_API_URL + "games/" + gameID;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating game");
        } else {
          alert(response.data.message);
          navigate("/games");
        }
      } catch (err) {
        console.log("Error updating game:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update Game</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Game Date:</label>
          <input
            type="date"
            name="gameDate"
            onChange={handleInputChange}
            required
            value={formData.gameDate}
          />
        </div>
        <div>
          <label>Home Team:</label>
          <Dropdown
            name="homeTeam"
            options={teamOptions}
            optionID="teamID"
            optionName="teamName"
            value={formData.homeTeam}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Away Team:</label>
          <Dropdown
            name="awayTeam"
            options={teamOptions}
            optionID="teamID"
            optionName="teamName"
            value={formData.awayTeam}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Home Team Score:</label>
          <input
            type="number"
            name="homeTeamScore"
            onChange={handleInputChange}
            required
            defaultValue={prevGame.homeTeamScore}
          />
        </div>
        <div>
          <label>Away Team Score:</label>
          <input
            type="number"
            name="awayTeamScore"
            onChange={handleInputChange}
            required
            defaultValue={prevGame.awayTeamScore}
          />
        </div>
        <div>
          <label>Overtime:</label>
          <input
            type="number"
            name="overTime"
            min="0"
            onChange={handleInputChange}
            defaultValue={prevGame.overTime}
          />
        </div>
        <div>
          <label>Post Season:</label>
          <input
            type="checkbox"
            name="postSeason"
            onChange={handleInputChange}
            checked={prevGame.postSeason === null ? false : true}
          />
        </div>
        <button type="button" onClick={() => navigate("/games")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateGame;
