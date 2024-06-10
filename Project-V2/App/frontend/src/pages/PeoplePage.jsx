// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for page:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { Routes, Route, Link } from "react-router-dom";
import CreatePerson from "../components/bsg_people/CreatePerson";
import PeopleTable from "../components/bsg_people/PersonTable";
import UpdatePerson from "../components/bsg_people/UpdatePerson";

function PeoplePage() {
  return (
    <div className="App-Page">
      <h1>BSG People Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/people">BSG People Table</Link>
          </li>
          <li>
            <Link to="/people/add">Add BSG Person</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<PeopleTable />} />
        <Route path="/add" element={<CreatePerson />} />
        <Route path="/edit/:id" element={<UpdatePerson />} />
      </Routes>
    </div>
  );
}

export default PeoplePage;
