// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for page:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

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
