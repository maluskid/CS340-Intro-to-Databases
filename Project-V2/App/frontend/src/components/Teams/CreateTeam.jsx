import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateTeam() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    teamName: "",
    coach: "",
    wins: "",
    losses: "",
  });

  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // // Create a new team object from the formData
    const newTeam = {
      teamNname: formData.teamName,
      coach: formData.coach,
      wins: formData.wins,
      losses: formData.losses,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "teams";
      const response = await axios.post(URL, newTeam);
      if (response.status === 201) {
        navigate("/teams");
      } else {
        alert("Error creating team");
      }
    } catch (error) {
      alert("Error creating team");
      console.error("Error creating team:", error);
    }
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      teamName: "",
      coach: "",
      currentRecord: "",
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
      <h2>Create Team</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="teamName">Team Name</label>
        <input
          type="text"
          name="teamName"
          defaultValue={formData.teamName}
          onChange={handleInputChange}
        />
        <label htmlFor="coach">Coach</label>
        <input
          type="text"
          name="coach"
          defaultValue={formData.coach}
          onChange={handleInputChange}
        />
        <label htmlFor="wins">Wins</label>
        <input
          type="number"
          name="wins"
          value={formData.wins}
          onChange={handleInputChange}
        />
        <label htmlFor="losses">Losses</label>
        <input
          type="number"
          name="losses"
          value={formData.losses}
          onChange={handleInputChange}
        />
        <button type="submit">Create Team</button>
      </form>
    </>
  );
}

export default CreateTeam;
