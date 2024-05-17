import { Routes, Route, Link } from "react-router-dom";
import GamesTable from "../components/Games/GamesTable";
// import CreateGame from "../components/Games/CreateGame";
// import PeopleTable from "../components/bsg_people/PersonTable";
// import UpdatePerson from "../components/bsg_people/UpdatePerson";

function GamesPage() {
  return (
    <div>
      <h1>Games Page</h1>
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
        {/* <Route path="/add" element={<CreateGame />} /> */}
        {/* <Route path="/edit/:id" element={<UpdatePerson />} /> */}
      </Routes>
    </div>
  );
}

export default GamesPage;
