import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ player, fetchPlayers }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit person page
  const handleEdit = () => {
    // We can access the id (and query the person) with useParams() in the UpdatePerson component

    navigate("/players/edit/" + player.playerID, { state: { player } });
  };

  // DELETE 
  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "players/" + player.playerID;
      const response = await axios.delete(URL);
      // Ensure that the person was deleted successfully
      if (response.status === 204) {
        alert("Player deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting player");
      console.log(err);
    }
    fetchPlayers();
  };

  return (
      <tr key={player.playerID}>
        <td>{player.playerID}</td> 
        <td>{player.playerName}</td>  
        <td>{player.teamID}</td>
        <td>{player.jerseyNumber}</td>
        <td>{player.height}</td>
        <td>{player.weight}</td>
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
