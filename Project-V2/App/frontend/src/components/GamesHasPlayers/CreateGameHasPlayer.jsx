import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateGameHasPlayer() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gamehasplayerName: "",
    coach: "",
    currentRecord: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // // Create a new gamehasplayer object from the formData
    // const newGameHasPlayer = {
    //   fname: formData.fname,
    //   lname: formData.lname,
    //   homeworld: formData.homeworld,
    //   age: formData.age,
    // };

    // try {
    //   const URL = import.meta.env.VITE_API_URL + "people";
    //   const response = await axios.post(URL, newGameHasPlayer);
    //   if (response.status === 201) {
    //     navigate("/people");
    //   } else {
    //     alert("Error creating gamehasplayer");
    //   }
    // } catch (error) {
    //   alert("Error creating gamehasplayer");
    //   console.error("Error creating gamehasplayer:", error);
    // }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      gamehasplayerName: "",
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
      <h2>Associate a Player with a Game</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="playerID">Player Name</label>
        <input
          type="text"
          name="playerID"
          defaultValue={formData.playerID}
          onChange={handleInputChange}
        />
        <label htmlFor="gameID">Game</label>
        <input
          type="text"
          name="gameID"
          defaultValue={formData.gameID}
          onChange={handleInputChange}
        />
        <button type="submit">Associate Player with Game</button>
      </form>
    </>
  );
}

export default CreateGameHasPlayer;
