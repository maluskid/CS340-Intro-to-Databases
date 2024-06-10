import { Routes, Route, Link } from "react-router-dom";
import TeamsTable from "../components/Teams/TeamsTable";
import CreateTeam from "../components/Teams/CreateTeam";
import UpdateTeam from "../components/Teams/UpdateTeam";
import TeamPlayersList from "../components/Teams/TeamPlayersList";

function TeamsPage() {
  return (
    <div className="App-Page">
      <h2>Teams Page</h2>
      <nav>
        <ul>
          <li>
            <Link to="/teams">Teams Table</Link>
          </li>
          <li>
            <Link to="/teams/add">Add Team</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<TeamsTable />} />
        <Route path="/add" element={<CreateTeam />} />
        <Route path="/edit/:teamID" element={<UpdateTeam />} />
        <Route path="/playerlist/:teamID" element={<TeamPlayersList />} />
      </Routes>
    </div>
  );
}

export default TeamsPage;
