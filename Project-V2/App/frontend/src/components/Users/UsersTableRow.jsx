import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ user, fetchUsers }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit person page
  const handleEdit = () => {

    navigate("/users/edit/" + user.userID, { state: { user } });
  };

  // DELETE 
  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "users/" + user.userID;
      const response = await axios.delete(URL);
      // Ensure that the person was deleted successfully
      if (response.status === 204) {
        alert("User deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting user");
      console.log(err);
    }
    fetchUsers();
  };

  return (
      <tr key={user.userID}>
        <td>{user.userID}</td>  
        <td>{user.userName}</td>
        <td>{user.favoritePlayer}</td>
        <td>{user.favoriteTeam}</td>
        <td>
          <BiEditAlt onClick={handleEdit} size={25} style={{ cursor: "pointer" }} />
        </td>
        <td>
          <BsTrash onClick={deleteRow} size={25} style={{ cursor: "pointer" }} />
        </td>
    </tr>
  );
};

export default TableRow;
