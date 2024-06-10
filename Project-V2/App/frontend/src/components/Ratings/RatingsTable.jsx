import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./RatingsTableRow";
import axios from "axios";

const RatingsTable = () => {
  const [ratings, setRatings] = useState([]);

  // Note this function is slightly different than fetchUserOptions in components
  const fetchUserOptions = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "users/options";
      const response = await axios.get(URL);
      return response.data.map(user => ({
        userID: user.userID,
        userName: user.userName
      }));
    } catch (error) {
      alert("Error fetching user options from the server.");
      console.error("Error fetching user options:", error);
    }
  };

  // Note this function is slightly different than fetchGameOptions in components
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

  const getOption = (optionID, options) => {
    console.log(`getOption called on ${optionID}, ${options}`);
    // returns a string with both the ID and the actual value in the same area to save space in the table
    const option = options[optionID].userName === undefined ? options[optionID].gameName : options[optionID].userName;
    return (optionID + ": " + option);
  }

  const fetchRatings = async () => {
    console.log("Fetching ratings...");
    try {
      const URL = import.meta.env.VITE_API_URL + "ratings";
      const userOptions = fetchUserOptions();
      const gameOptions = fetchGameOptions();
      const response = await axios.get(URL);
      console.log(`Fetched ratings: ${response}`);
      setRatings(response.data.map(rating => ({
        ratingID: rating.ratingID,
        rating: rating.rating,
        user: getOption(rating.userID, userOptions),
        game: getOption(rating.gameID, gameOptions),
      })));
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
      <p>Users and Games formatted as [userID: user] [gameID: game]</p>
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
              <th>User</th>
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
