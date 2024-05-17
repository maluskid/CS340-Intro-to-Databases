import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateTeam() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    teamName: "",
    coach: "",
    currentRecord: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // // Create a new team object from the formData
    // const newTeam = {
    //   fname: formData.fname,
    //   lname: formData.lname,
    //   homeworld: formData.homeworld,
    //   age: formData.age,
    // };

    // try {
    //   const URL = import.meta.env.VITE_API_URL + "people";
    //   const response = await axios.post(URL, newTeam);
    //   if (response.status === 201) {
    //     navigate("/people");
    //   } else {
    //     alert("Error creating team");
    //   }
    // } catch (error) {
    //   alert("Error creating team");
    //   console.error("Error creating team:", error);
    // }
    // Reset the form fields
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
    // const { name, value } = e.target;
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
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
        <label htmlFor="currentRecord">Current Record</label>
        <input
          type="text"
          name="currentRecord"
          value={formData.currentRecord}
          onChange={handleInputChange}
        />
        <button type="submit">Create Team</button>
      </form>
    </>
  );
}

export default CreateTeam;
