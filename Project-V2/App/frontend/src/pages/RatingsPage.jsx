import { Routes, Route, Link } from "react-router-dom";
import RatingsTable from "../components/Ratings/RatingsTable";
import CreateRating from "../components/Ratings/CreateRating";
import UpdateRating from "../components/Ratings/UpdateRating";

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
        <Route path="/add" element={<CreateRating />} />
        <Route path="/edit/:ratingID" element={<UpdateRating />} />
      </Routes>
    </div>
  );
}

export default RatingsPage;
