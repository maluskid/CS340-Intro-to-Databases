import React, { useState } from 'react';
import DataTable from "../components/DataTable";

export default function PlayersPage() {

  // placeholder for data entry for new player
  const [playerName, setPlayerName] = useState(undefined);
  const [jerseyNumber, setJerseyNumber] = useState(undefined);

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

  async function createNew() {
    const newItem = { playerName, jerseyNumber };
    // send POST with newItem 
  }

  return (
    <div className="App-Page">
      <DataTable currentTable={playersTable} />
      <h4>Enter new Player</h4>
      <input
        type="text"
        placeholder="Player Name"
        value={playerName}
        onChange={e => setPlayerName(e.target.value)} />
      <input
        type="number"
        placeholder={0}
        value={jerseyNumber}
        onChange={e => setJerseyNumber(e.target.value)} />
      <button onClick={createNew}>Insert</button>

    </div >
  );
}
