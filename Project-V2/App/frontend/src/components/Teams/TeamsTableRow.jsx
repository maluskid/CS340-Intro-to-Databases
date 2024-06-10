import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ team, fetchTeams }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit person page
  const handleEdit = () => {
    // We can access the id (and query the team) with useParams() in the UpdateTeam component

    navigate("/teams/edit/" + team.teamID, { state: { team } });
  };

  // DELETE 
  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "teams/" + team.teamID;
      const response = await axios.delete(URL);
      // Ensure that the team was deleted successfully
      if (response.status === 204) {
        alert("Team deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting team");
      console.log(err);
    }
    fetchTeams();
  };

  return (
    <tr key={team.teamID}>
      <td>{team.teamID}</td>
      <td>{team.teamName}</td>
      <td>{team.coach}</td>
      <td>{team.wins}</td>
      <td>{team.losses}</td>
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
