import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dropdown from "../dropdown/Dropdown";

function CreateGameHasPlayer() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gameID: "",
    playerID: "",
  });

  const [playerOptions, setPlayerOptions] = useState([]);
  const [gameOptions, setGameOptions] = useState([]);

  const fetchPlayerOptions = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "players/options";
      const response = await axios.get(URL);
      setPlayerOptions(response.data);
    } catch (error) {
      alert("Error fetching team options from the server.");
      console.error("Error fetching team options:", error);
    }
  };

  const fetchGameOptions = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "games/options";
      const response = await axios.get(URL);

      const gameOptions = response.data.map(game => ({
        gameID: game.gameID,
        gameName: `${game.gameDate.slice(0, 10)}: ${game.homeTeamName} vs ${game.awayTeamName}`
      }));

      setGameOptions(gameOptions);
    } catch (error) {
      alert("Error fetching game options from the server.");
      console.error("Error fetching game options:", error);
    }
  };

  useEffect(() => {
    fetchPlayerOptions();
    fetchGameOptions();
  }, []);

  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // // Create a new gamehasplayer object from the formData
    // const newGameHasPlayer = {
    //   fname: formData.fname,
    //   lname: formData.lname,
    //   homeworld: formData.homeworld,
    //   age: formData.age,
    // };

    // try {
    //   const URL = import.meta.env.VITE_API_URL + "people";
    //   const response = await axios.post(URL, newGameHasPlayer);
    //   if (response.status === 201) {
    //     navigate("/people");
    //   } else {
    //     alert("Error creating gamehasplayer");
    //   }
    // } catch (error) {
    //   alert("Error creating gamehasplayer");
    //   console.error("Error creating gamehasplayer:", error);
    // }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      gameID: "",
      playerID: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <h2>Associate a Player with a Game</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="playerID">Player Name</label>
        <Dropdown
          name="playerID"
          options={playerOptions}
          optionID="playerID"
          optionName="playerName"
          value={formData.playerID}
          onChange={handleInputChange}
        />
        <label htmlFor="gameID">Game</label>
        <Dropdown
          name="gameID"
          options={gameOptions}
          optionID="gameID"
          optionName="gameName"
          value={formData.gameID}
          onChange={handleInputChange}
        />
        <button type="submit">Associate Player with Game</button>
      </form>
    </>
  );
}

export default CreateGameHasPlayer;
