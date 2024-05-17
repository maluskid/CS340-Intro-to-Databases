import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateRating() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ratingName: "",
    coach: "",
    currentRecord: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // // Create a new rating object from the formData
    // const newRating = {
    //   fname: formData.fname,
    //   lname: formData.lname,
    //   homeworld: formData.homeworld,
    //   age: formData.age,
    // };

    // try {
    //   const URL = import.meta.env.VITE_API_URL + "people";
    //   const response = await axios.post(URL, newRating);
    //   if (response.status === 201) {
    //     navigate("/people");
    //   } else {
    //     alert("Error creating rating");
    //   }
    // } catch (error) {
    //   alert("Error creating rating");
    //   console.error("Error creating rating:", error);
    // }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      userID: "",
      gameID: "",
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
      <h2>Create Rating</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userID">Username</label>
        <input
          type="text"
          name="userID"
          defaultValue={formData.userID}
          onChange={handleInputChange}
        />
        <label htmlFor="gameID">Game</label>
        <input
          type="text"
          name="coacgameIDh"
          defaultValue={formData.gameID}
          onChange={handleInputChange}
        />
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          name="rating"
          defaultValue={formData.rating}
          onChange={handleInputChange}
        />
        <button type="submit">Create Rating</button>
      </form>
    </>
  );
}

export default CreateRating;
