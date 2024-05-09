import React from 'react';
import DataTable from "../components/DataTable";

export default function PlayersPage() {

  // Placeholder for GET request to database
  const playersTable = [{
    tableName: "Players",
    playerID: "Player ID",
    playerName: "Player Name",
    teamID: "Team ID",
    jerseyNumber: "Jersey Number",
    height: `6'6"`,
    weight: "200 lbs"
  }]
  return (
    <div className="App-Page">
      <DataTable currentTable={playersTable} />
    </div >
  );
}
