import React from 'react';
import DataTable from "../components/DataTable";

export default function RatingsPage() {

  // Placeholder for GET request to database
  const ratingsTable = [{
    tableName: "Ratings",
    ratingID: "(userID, teamID)",
    userID: "FK user ID",
    teamID: "Team ID",
    rating: "11/10"
  }]
  return (
    <div className="App-Page">
      <DataTable currentTable={ratingsTable} />
    </div >
  );
}
