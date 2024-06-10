import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dropdown from "../dropdown/Dropdown";

function CreateGame() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gameDate: "",
    homeTeam: "",
    awayTeam: "",
    homeTeamScore: "",
    awayTeamScore: "",
    overTime: null,
    postSeason: null,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGame = {
      gameDate: formData.gameDate,
      homeTeam: formData.homeTeam,
      awayTeam: formData.awayTeam,
      homeTeamScore: formData.homeTeamScore,
      awayTeamScore: formData.awayTeamScore,
      overTime: formData.overTime,
      postSeason: formData.postSeason,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "games";
      const response = await axios.post(URL, newGame);
      if (response.status === 201) {
        navigate("/games");
      } else {
        alert("Error creating game");
      }
    } catch (error) {
      alert("Error creating game");
      console.error("Error creating game:", error);
    }
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      gameDate: "",
      homeTeam: "",
      awayTeam: "",
      homeTeamScore: "",
      awayTeamScore: "",
      overTime: null,
      postSeason: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div>
      <h2>Create Game</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="gameDate">Date</label>
        <input
          type="date"
          name="gameDate"
          defaultValue={formData.gameDate}
          onChange={handleInputChange}
        />
        <label htmlFor="homeTeam">Home Team</label>
        <Dropdown
          name="homeTeam"
          options={teamOptions}
          optionID="teamID"
          optionName="teamName"
          value={formData.homeTeam}
          onChange={handleInputChange}
        />
        <label htmlFor="awayTeam">Away Team</label>
        <Dropdown
          name="awayTeam"
          options={teamOptions}
          optionID="teamID"
          optionName="teamName"
          value={formData.awayTeam}
          onChange={handleInputChange}
        />
        <label htmlFor="homeTeamScore">Home Team Score</label>
        <input
          type="number"
          name="homeTeamScore"
          defaultValue={formData.homeTeamScore}
          onChange={handleInputChange}
        />
        <label htmlFor="awayTeamScore">Away Team Score</label>
        <input
          type="number"
          name="awayTeamScore"
          defaultValue={formData.awayTeamScore}
          onChange={handleInputChange}
        />
        <label htmlFor="overTime">Overtime</label>
        <input
          type="number"
          name="overTime"
          value={formData.overTime}
          onChange={handleInputChange}
        />
        <label htmlFor="postSeason">Post Season</label>
        <input
          type="checkbox"
          name="postSeason"
          checked={formData.postSeason}
          onChange={handleInputChange}
        />
        <button type="submit">Create Game</button>
      </form>
    </div>
  );
}

export default CreateGame;
