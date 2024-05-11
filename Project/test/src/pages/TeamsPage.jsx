import React, { useState } from 'react';
import DataTable from "../components/DataTable";

export default function TeamsPage() {

  // placeholder for data entry for new game
  const [teamName, setTeamName] = useState(undefined);
  const [coach, setCoach] = useState(undefined);

  async function createNew() {
    const newItem = { teamName, coach };
    // send POST with newItem 
  }

  // Placeholder for GET request to database
  const teamsTable = [{
    tableName: "Teams",
    teamID: "Team ID",
    teamName: "Team Name",
    coach: "Mike Budenholzer",
    currentRecord: "0/82"
  }];

  return (
    <div className="App-Page">
      <DataTable currentTable={teamsTable} />
      <input
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={e => setTeamName(e.target.value)} />
      <input
        type="text"
        placeholder="Coach"
        value={coach}
        onChange={e => setCoach(e.target.value)} />
      <button onClick={createNew}>Insert</button>

    </div >
  );
}
