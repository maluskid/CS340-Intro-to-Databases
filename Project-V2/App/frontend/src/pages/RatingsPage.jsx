import { Routes, Route, Link } from "react-router-dom";
import RatingsTable from "../components/Ratings/RatingsTable";
import CreateRating from "../components/Ratings/CreateRating";
// import PeopleTable from "../components/bsg_people/PersonTable";
// import UpdatePerson from "../components/bsg_people/UpdatePerson";

function RatingsPage() {
  return (
    <div className="App-Page">
      <h2>Ratings Page</h2>
      <nav>
        <ul>
          <li>
            <Link to="/ratings">Ratings Table</Link>
          </li>
          <li>
            <Link to="/ratings/add">Add Rating</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<RatingsTable />} />
        {/* <Route path="/add" element={<CreateRating />} />
        <Route path="/edit/:id" element={<UpdatePerson />} /> */}
      </Routes>
    </div>
  );
}

export default RatingsPage;
