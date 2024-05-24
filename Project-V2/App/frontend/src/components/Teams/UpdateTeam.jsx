import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevTeam = location.state.team;

  const [formData, setFormData] = useState({
    teamName: prevTeam.teamName || '',
    coach: prevTeam.lname || '',
    wins: prevTeam.homeworld || 0,
    losses: prevTeam.age || 0,
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
      wins: prevTeam.wins || 0,
      losses: prevTeam.losses || 0,
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
        const URL = import.meta.env.VITE_API_URL + "teams/" + id;
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
            defaultValue={prevPerson.fname}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lname"
            onChange={handleInputChange}
            required
            defaultValue={prevPerson.lname}
          />
        </div>
        <div>
          <label>Homeworld:</label>
          <input
            type="number"
            name="homeworld"
            onChange={handleInputChange}
            defaultValue={prevPerson.homeworld}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            onChange={handleInputChange}
            required
            defaultValue={prevPerson.age}
          />
        </div>
        <button type="button" onClick={() => navigate("/people")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdatePerson;

