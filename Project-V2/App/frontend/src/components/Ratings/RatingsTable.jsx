import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./RatingsTableRow";
import axios from "axios";

const RatingsTable = () => {
  const [ratings, setRatings] = useState([]);

  const fetchUserOptions = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "users/options";
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      alert("Error fetching user options from the server.");
      console.error("Error fetching user options:", error);
    }
  };

  const fetchGameOptions = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "games/options";
      const response = await axios.get(URL);
      return response.data.map(game => ({
        gameID: game.gameID,
        gameName: `${game.gameDate.slice(0, 10)}: ${game.homeTeamName} vs ${game.awayTeamName}`
      }));
    } catch (error) {
      alert("Error fetching game options from the server.");
      console.error("Error fetching game options:", error);
    }
  };

  const fetchRatings = async () => {

    try {
      const gameOptions = await fetchGameOptions();
      const userOptions = await fetchUserOptions();
      console.log(`GameOptions and UserOptions: ${JSON.stringify(gameOptions)}\n${JSON.stringify(userOptions)}`);
      const URL = import.meta.env.VITE_API_URL + "ratings";
      const response = await axios.get(URL);
      const ratings = response.data.map((rating) => ({
        ratingID: rating.ratingID,
        userID: rating.userID,
        userName: userOptions.find((user) => user.userID === rating.userID).userName,
        gameID: rating.gameID,
        gameName: gameOptions.find((game) => game.gameID === rating.gameID).gameName,
        rating: rating.rating
      }));

      setRatings(ratings);
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
              <th>Rating ID</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Game ID</th>
              <th>Game</th>
              <th>Rating</th>
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
