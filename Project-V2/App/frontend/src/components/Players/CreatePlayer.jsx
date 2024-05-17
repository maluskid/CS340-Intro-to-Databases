import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreatePlayer() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    playerName: "",
    coach: "",
    currentRecord: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // // Create a new player object from the formData
    // const newPlayer = {
    //   fname: formData.fname,
    //   lname: formData.lname,
    //   homeworld: formData.homeworld,
    //   age: formData.age,
    // };

    // try {
    //   const URL = import.meta.env.VITE_API_URL + "people";
    //   const response = await axios.post(URL, newPlayer);
    //   if (response.status === 201) {
    //     navigate("/people");
    //   } else {
    //     alert("Error creating player");
    //   }
    // } catch (error) {
    //   alert("Error creating player");
    //   console.error("Error creating player:", error);
    // }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      playerName: "",
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
      <h2>Create Player</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="playerName">Player Name</label>
        <input
          type="text"
          name="playerName"
          defaultValue={formData.playerName}
          onChange={handleInputChange}
        />
        <label htmlFor="team">Coach</label>
        <input
          type="text"
          name="team"
          defaultValue={formData.team}
          onChange={handleInputChange}
        />
        <label htmlFor="jerseyNumber">Current Record</label>
        <input
          type="number"
          name="jerseyNumber"
          value={formData.jerseyNumber}
          onChange={handleInputChange}
        />
        <label htmlFor="height">Height</label>
        <input 
          type="number" 
          name="height" 
          value={formData.height} 
          onChange={handleInputChange} 
        />
        <label htmlFor="weight">Weight</label>
        <input 
          type="number" 
          name="weight" 
          value={formData.weight} 
          onChange={handleInputChange} 
        />
        <button type="submit">Create Player</button>
      </form>
    </>
  );
}

export default CreatePlayer;
