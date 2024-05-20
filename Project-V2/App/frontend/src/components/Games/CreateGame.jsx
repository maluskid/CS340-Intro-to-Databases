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
    overTime: false,
    postSeason: false,
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
    // Prevent page reload
    e.preventDefault();
    // // Create a new game object from the formData
    // const newGame = {
    //   fname: formData.fname,
    //   lname: formData.lname,
    //   homeworld: formData.homeworld,
    //   age: formData.age,
    // };

    // try {
    //   const URL = import.meta.env.VITE_API_URL + "people";
    //   const response = await axios.post(URL, newGame);
    //   if (response.status === 201) {
    //     navigate("/people");
    //   } else {
    //     alert("Error creating game");
    //   }
    // } catch (error) {
    //   alert("Error creating game");
    //   console.error("Error creating game:", error);
    // }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      gameDate: "",
      homeTeam: "",
      awayTeam: "",
      homeTeamScore: "",
      awayTeamScore: "",
      overTime: false,
      postSeason: false,
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
    <>
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
          type="checkbox"
          name="overTime"
          checked={formData.overTime}
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
    </>
  );
}

export default CreateGame;
