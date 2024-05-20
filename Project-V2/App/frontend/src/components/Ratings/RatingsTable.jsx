import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./RatingsTableRow";
import axios from "axios";

const RatingsTable = () => {
  const [ratings, setRatings] = useState([]);

  const fetchRatings = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "ratings";
      const response = await axios.get(URL);
      setRatings(response.data);
    } catch (error) {
      alert("Error fetching ratings from the server.");
      console.error("Error fetching ratings:", error);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  return (
    <div>
      <h2>Ratings Table</h2>
      {ratings.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No ratings found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              {/* <th>Rating ID</th> */}
              <th>Rating ID</th>
              <th>User ID</th>
              <th>Game ID</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((rating) => (
              <TableRow key={rating.ratingID} rating={rating} fetchRatings={fetchRatings} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RatingsTable;
