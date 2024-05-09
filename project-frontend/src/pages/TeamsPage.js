import React from 'react';
import DataTable from "../components/DataTable";

export default function TeamsPage() {

  // Placeholder for GET request to database
  const teamsTable = [{
    teamID: "Team ID",
    teamName: "Team Name",
    coach: "Mike Budenholzer",
    currentRecord: "0/82"
  }]
  return (
    <div>
      <DataTable currentTable={teamsTable} />
    </div >
  );
}
