import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateGameHasPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevGameHasPlayer = location.state.gameHasPlayer;

  const [formData, setFormData] = useState({
    gameID: prevGameHasPlayer.gameID || '',
    playerID: prevGameHasPlayer.playerID || '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // // Check if formData is equal to prevGameHasPlayer
    // if (JSON.stringify(formData) === JSON.stringify({
    //   gameID: prevGameHasPlayer.gameID || '',
    //   playerID: prevGameHasPlayer.playerID || '',
    // })) {
    //   alert("No changes made.");
    //   return false;
    // }
    // return true
  }

  const handleSubmit = async (event) => {
    // // Stop default form behavior which is to reload the page
    // event.preventDefault();
    // // Check if formData is equal to prevGameHasPlayer
    // if (isUpdate()){
    //   try {
    //     const URL = import.meta.env.VITE_API_URL + "gamesHasPlayers/" + id;
    //     const response = await axios.put(URL, formData);
    //     if (response.status !== 200) {
    //       alert("Error updating gameHasPlayer");
    //     } else {
    //       alert(response.data.message);
    //       // Redirect to people page
    //       navigate("/people");
    //     }
    //   } catch (err) {
    //     console.log("Error updating GameHasPlayer:", err);
    //   }
    // }
  };

  return (
    <div>
      <h2>Update GameHasPlayer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Game:</label>
          <input
            type="number"
            name="gameID"
            onChange={handleInputChange}
            required
            defaultValue={prevGameHasPlayer.gameID}
          />
        </div>
        <div>
          <label>Player:</label>
          <input
            type="number"
            name="playerID"
            onChange={handleInputChange}
            required
            defaultValue={prevGameHasPlayer.playerID}
          />
        </div>
        <button type="button" onClick={() => navigate("/gamesHasPlayers")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateGameHasPlayer;

