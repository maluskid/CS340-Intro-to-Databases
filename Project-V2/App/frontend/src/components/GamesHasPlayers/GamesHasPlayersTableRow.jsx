// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for component:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ gameHasPlayer, fetchGamesHasPlayers }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit person page
  const handleEdit = () => {
    // We can access the id (and query the person) with useParams() in the UpdatePerson component

    navigate("/gamesHasPlayers/edit/" + gameHasPlayer.gameHasPlayerID, { state: { gameHasPlayer } });
  };

  // DELETE 
  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "gamesHasPlayers/" + gameHasPlayer.gameHasPlayerID;
      const response = await axios.delete(URL);
      // Ensure that the person was deleted successfully
      if (response.status === 204) {
        alert("GameHasPlayer deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting GameHasPlayer");
      console.log(err);
    }
    fetchGamesHasPlayers();
  };

  return (
    // Give games has players a PK that is not a composite of 2 FKs
      <tr key={gameHasPlayer.gameHasPlayerID}> 
        <td>{gameHasPlayer.gameHasPlayerID}</td>  
        <td>{gameHasPlayer.gameID}</td>  
        <td>{gameHasPlayer.playerID}</td>
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
