import React from 'react';
import DataTable from "../components/DataTable";

export default function TeamsPage() {

  // Placeholder for GET request to database
  const teamsTable = [{
    tableName: "Teams",
    teamID: "Team ID",
    teamName: "Team Name",
    coach: "Mike Budenholzer",
    currentRecord: "0/82"
  }]
  return (
    <div className="App-Page">
      <DataTable currentTable={teamsTable} />
    </div >
  );
}
