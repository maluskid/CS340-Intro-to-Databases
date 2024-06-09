import { Routes, Route, Link } from "react-router-dom";
import PlayersTable from "../components/Players/PlayersTable";
import CreatePlayer from "../components/Players/CreatePlayer";
import UpdatePlayer from "../components/Players/UpdatePlayer";

function PlayersPage() {
  return (
    <div className="App-Page">
      <h2>Players Page</h2>
      <nav>
        <ul>
          <li>
            <Link to="/players">Players Table</Link>
          </li>
          <li>
            <Link to="/players/add">Add Player</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<PlayersTable />} />
        <Route path="/add" element={<CreatePlayer />} />
        <Route path="/edit/:playerID" element={<UpdatePlayer />} />
      </Routes>
    </div>
  );
}

export default PlayersPage;
