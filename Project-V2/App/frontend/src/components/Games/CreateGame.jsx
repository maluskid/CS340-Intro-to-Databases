import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateGame() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gameName: "",
    coach: "",
    currentRecord: "",
  });
  
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
      gameName: "",
      coach: "",
      currentRecord: "",
    });
  };

  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
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
        <input
          type="text"
          name="homeTeam"
          defaultValue={formData.homeTeam}
          onChange={handleInputChange}
        />
        <label htmlFor="awayTeam">Away Team</label>
        <input
          type="text"
          name="awayTeam"
          value={formData.awayTeam}
          onChange={handleInputChange}
        />
        <label htmlFor="homeTeamScore">Home Team Score</label>
        <input
          type="number"
          name="homeTeamScore"
          value={formData.homeTeamScore}
          onChange={handleInputChange}
        />
        <label htmlFor="awayTeamScore">Away Team Score</label>
        <input
          type="number"
          name="awayTeamScore"
          value={formData.awayTeamScore}
          onChange={handleInputChange}
        />
        <label htmlFor="overTime">Overtime</label>
        <input
          type="checkbox"
          name="overTime"
          value={formData.overTime}
          onChange={handleInputChange}
        />
        <label htmlFor="postSeason">Post Season</label>
        <input
          type="checkbox"
          name="overTime"
          value={formData.postSeason}
          onChange={handleInputChange}
        />
        <button type="submit">Create Game</button>
      </form>
    </>
  );
}

export default CreateGame;
