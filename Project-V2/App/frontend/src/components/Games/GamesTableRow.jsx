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
const TableRow = ({ game, fetchGames }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit person page
  const handleEdit = () => {
    // We can access the id (and query the game) with useParams() in the UpdateGame component

    navigate("/games/edit/" + game.gameID, { state: { game } });
  };

  // DELETE 
  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "games/" + game.gameID;
      const response = await axios.delete(URL);
      // Ensure that the game was deleted successfully
      if (response.status === 204) {
        alert("Game deleted successfully");
      }
    } catch (error) {
      alert(err.response.data.error || "Error deleting game");
      console.log(error);
    }
    fetchGames();
  };

  return (
    <tr key={game.gameID}>
      <td>{game.gameID}</td>
      <td>{game.gameName}</td>
      <td>{game.gameDate.slice(0, 10)}</td>
      <td>{game.homeTeam}</td>
      <td>{game.awayTeam}</td>
      <td>{game.homeTeamScore}</td>
      <td>{game.awayTeamScore}</td>
      <td>{game.overTime}</td>
      <td>{game.postSeason ? "Yes" : ""}</td>
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
