import { Routes, Route, Link } from "react-router-dom";
import GamesTable from "../components/Games/GamesTable";
import CreateGame from "../components/Games/CreateGame";
import UpdateGame from "../components/Games/UpdateGame";

function GamesPage() {
  return (
    <div className="App-Page">
      <h2>Games Page</h2>
      <nav>
        <ul>
          <li>
            <Link to="/games">Games Table</Link>
          </li>
          <li>
            <Link to="/games/add">Add Game</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<GamesTable />} />
        <Route path="/add" element={<CreateGame />} />
        <Route path="/edit/:gameID" element={<UpdateGame />} />
      </Routes>
    </div>
  );
}

export default GamesPage;
