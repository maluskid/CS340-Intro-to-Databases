import { Routes, Route, Link } from "react-router-dom";
import PlayersTable from "../components/Players/PlayersTable";
import CreatePlayer from "../components/Players/CreatePlayer";
// import PeopleTable from "../components/bsg_people/PersonTable";
// import UpdatePerson from "../components/bsg_people/UpdatePerson";

function PlayersPage() {
  return (
    <div>
      <h1>Players Page</h1>
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
        {/* <Route path="/edit/:id" element={<UpdatePerson />} /> */}
      </Routes>
    </div>
  );
}

export default PlayersPage;
