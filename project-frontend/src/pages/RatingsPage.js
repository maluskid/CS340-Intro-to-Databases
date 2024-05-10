import React from 'react';
import DataTable from "../components/DataTable";

export default function RatingsPage() {

  // placeholder for data entry for new game
  const [rating, setRating] = useState(undefined);

  // Placeholder for GET request to database
  const ratingsTable = [{
    tableName: "Ratings",
    ratingID: "(userID, teamID)",
    userID: "FK user ID",
    teamID: "Team ID",
    rating: "11/10"
  }];

  async function createNew() {
    const newItem = { homeTeam, awayTeam };
    // send POST with newItem 
  }

  return (
    <div className="App-Page">
      <DataTable currentTable={ratingsTable} />
      <h4>Enter new Rating</h4>
      <input
        type="text"
        placeholder="Rating"
        value={rating}
        onChange={e => setRating(e.target.value)} />

    </div >
  );
}
