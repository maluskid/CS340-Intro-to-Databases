import { Routes, Route, Link } from "react-router-dom";
import GamesHasPlayersTable from "../components/GamesHasPlayers/GamesHasPlayersTable";
import CreateGameHasPlayer from "../components/GamesHasPlayers/CreateGameHasPlayer";
import UpdateGameHasPlayer from "../components/GamesHasPlayers/UpdateGameHasPlayer";

function GamesHasPlayersPage() {
  return (
    <div classname="App-Page">
      <h2>GamesHasPlayers Page</h2>
      <nav>
        <ul>
          <li>
            <Link to="/gamesHasPlayers">GamesHasPlayers Table</Link>
          </li>
          <li>
            <Link to="/gamesHasPlayers/add">Associate Player with a Game</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<GamesHasPlayersTable />} />
        <Route path="/add" element={<CreateGameHasPlayer />} />
        <Route path="/edit/:gameHasPlayerID" element={<UpdateGameHasPlayer />} />
      </Routes>
    </div>
  );
}

export default GamesHasPlayersPage;