// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for page:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { Routes, Route, Link } from "react-router-dom";
import TeamsTable from "../components/Teams/TeamsTable";
import CreateTeam from "../components/Teams/CreateTeam";
import UpdateTeam from "../components/Teams/UpdateTeam";

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
      </Routes>
    </div>
  );
}

export default TeamsPage;
