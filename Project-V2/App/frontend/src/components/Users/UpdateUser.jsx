import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Dropdown from "../dropdown/Dropdown";

const UpdateUser = () => {
  const { userID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevUser = location.state.user;

  const [formData, setFormData] = useState({
    userName: prevUser.userName || '',
    favoritePlayer: prevUser.favoritePlayer || '',
    favoriteTeam: prevUser.favoriteTeam || '',
  });

  const [teamOptions, setTeamOptions] = useState([]);
  const [playerOptions, setPlayerOptions] = useState([]);

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

  const fetchPlayerOptions = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "players/options";
      const response = await axios.get(URL);
      setPlayerOptions(response.data);
    } catch (error) {
      alert("Error fetching team options from the server.");
      console.error("Error fetching team options:", error);
    }
  };

  useEffect(() => {
    fetchTeamOptions();
    fetchPlayerOptions();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevUser
    if (JSON.stringify(formData) === JSON.stringify({
      userName: prevUser.userName || '',
      favoritePlayer: prevUser.favoritePlayer || '',
      favoriteTeam: prevUser.favoriteTeam || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevUser
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "users/" + userID;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating user");
        } else {
          alert(response.data.message);
          // Redirect to people page
          navigate("/users");
        }
      } catch (err) {
        console.log("Error updating user:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="number"
            name="userID"
            defaultValue={prevUser.userID}
            readOnly
          />
        </div>
        <div>
          <label>User Name:</label>
          <input
            type="text"
            name="userName"
            onChange={handleInputChange}
            required
            value={formData.userName}
          />
        </div>
        <div>
          <label>Favorite Player:</label>
          <Dropdown
          name="favoritePlayer"
          options={playerOptions}
          optionID="playerID"
          optionName="playerName"
          value={formData.favoritePlayer}
          onChange={handleInputChange}
        />
        </div>
        <div>
          <label>Favorite Team:</label>
          <Dropdown
          name="favoriteTeam"
          options={teamOptions}
          optionID="teamID"
          optionName="teamName"
          value={formData.favoriteTeam}
          onChange={handleInputChange}
        />
        </div>
        <button type="button" onClick={() => navigate("/users")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;

