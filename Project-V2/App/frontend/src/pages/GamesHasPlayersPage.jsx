import { Routes, Route, Link } from "react-router-dom";
import GamesHasPlayersTable from "../components/GamesHasPlayers/GamesHasPlayersTable";
import CreateGameHasPlayer from "../components/GamesHasPlayers/CreateGameHasPlayer";
// import PeopleTable from "../components/bsg_people/PersonTable";
// import UpdatePerson from "../components/bsg_people/UpdatePerson";

function GamesHasPlayersPage() {
  return (
    <div>
      <h1>GamesHasPlayers Page</h1>
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
        {/* <Route path="/edit/:id" element={<UpdatePerson />} /> */}
      </Routes>
    </div>
  );
}

export default GamesHasPlayersPage;
