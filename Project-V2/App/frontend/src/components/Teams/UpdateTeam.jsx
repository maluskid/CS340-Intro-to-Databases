// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for component:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateTeam = () => {
  const { teamID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevTeam = location.state.team;

  const [formData, setFormData] = useState({
    teamName: prevTeam.teamName || '',
    coach: prevTeam.coach || '',
    wins: prevTeam.wins || '',
    losses: prevTeam.losses || '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate() {
    if (JSON.stringify(formData) === JSON.stringify({
      teamName: prevTeam.teamName || '',
      coach: prevTeam.coach || '',
      wins: prevTeam.wins || '',
      losses: prevTeam.losses || '',
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
        const URL = import.meta.env.VITE_API_URL + "teams/" + teamID;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating team");
        } else {
          alert(response.data.message);
          navigate("/teams");
        }
      } catch (err) {
        console.log("Error updating team:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update Team</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Team Name:</label>
          <input
            type="text"
            name="teamName"
            onChange={handleInputChange}
            required
            defaultValue={prevTeam.teamName}
          />
        </div>
        <div>
          <label>Coach:</label>
          <input
            type="text"
            name="coach"
            onChange={handleInputChange}
            required
            defaultValue={prevTeam.coach}
          />
        </div>
        <div>
          <label>Wins:</label>
          <input
            type="number"
            name="wins"
            onChange={handleInputChange}
            defaultValue={prevTeam.wins}
          />
        </div>
        <div>
          <label>Losses:</label>
          <input
            type="number"
            name="losses"
            onChange={handleInputChange}
            required
            defaultValue={prevTeam.losses}
          />
        </div>
        <button type="button" onClick={() => navigate("/teams")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateTeam;
