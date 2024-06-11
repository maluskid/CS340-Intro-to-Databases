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
const TableRow = ({ rating, fetchRatings }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();

  const handleEdit = () => {

    navigate("/ratings/edit/" + rating.ratingID, { state: { rating } });
  };

  // DELETE 
  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "ratings/" + rating.ratingID;
      const response = await axios.delete(URL);
      // Ensure that the person was deleted successfully
      if (response.status === 204) {
        alert("Rating deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting rating");
      console.log(err);
    }
    fetchRatings();
  };

  return (
    <tr key={rating.ratingID}>
      <td>{rating.ratingID}</td>
      <td>{rating.userID}</td>
      <td>{rating.userName}</td>
      <td>{rating.gameID}</td>
      <td>{rating.gameName}</td>
      <td>{rating.rating}</td>
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
