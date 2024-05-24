import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ game, fetchGames }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit person page
  const handleEdit = () => {
    // We can access the id (and query the person) with useParams() in the UpdatePerson component

    // navigate("/people/edit/" + person.id, { state: { person } });
  };

  // DELETE 
  const deleteRow = async () => {
  //   try {
  //     const URL = import.meta.env.VITE_API_URL + "people/" + person.id;
  //     const response = await axios.delete(URL);
  //     // Ensure that the person was deleted successfully
  //     if (response.status === 204) {
  //       alert("Person deleted successfully");
  //     }
  //   } catch (err) {
  //     alert(err.response.data.error || "Error deleting person");
  //     console.log(err);
  //   }
    fetchGames();
  };

  return (
    <tr key={game.gameID}>
      <td>{game.gameID}</td>  
      <td>{game.gameDate.slice(0, 10)}</td>  
      <td>{game.homeTeam}</td>
      <td>{game.awayTeam}</td>
      <td>{game.homeTeamScore}</td>
      <td>{game.awayTeamScore}</td>
      <td>{game.overTime}</td>
      <td>{game.postSeason}</td>
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