import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevUser = location.state.user;

  const [formData, setFormData] = useState({
    favoritePlayer: prevUser.favoritePlayer || '',
    favoriteTeam: prevUser.favoriteTeam || '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // // Check if formData is equal to prevUser
    // if (JSON.stringify(formData) === JSON.stringify({
    //   favoritePlayer: prevUser.favoritePlayer || '',
    //   favoriteTeam: prevUser.favoriteTeam || '',
    // })) {
    //   alert("No changes made.");
    //   return false;
    // }
    // return true
  }

  const handleSubmit = async (event) => {
    // // Stop default form behavior which is to reload the page
    // event.preventDefault();
    // // Check if formData is equal to prevUser
    // if (isUpdate()){
    //   try {
    //     const URL = import.meta.env.VITE_API_URL + "users/" + id;
    //     const response = await axios.put(URL, formData);
    //     if (response.status !== 200) {
    //       alert("Error updating user");
    //     } else {
    //       alert(response.data.message);
    //       // Redirect to people page
    //       navigate("/users");
    //     }
    //   } catch (err) {
    //     console.log("Error updating user:", err);
    //   }
    // }
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
            defaultValue={prevUser.userName}
            readOnly
          />
        </div>
        <div>
          <label>Favorite Player:</label>
          <input
            type="text"
            name="favoritePlayer"
            onChange={handleInputChange}
            defaultValue={prevUser.favoritePlayer}
          />
        </div>
        <div>
          <label>Favorite Team:</label>
          <input
            type="text"
            name="favoriteTeam"
            onChange={handleInputChange}
            required
            defaultValue={prevUser.favoriteTeam}
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

