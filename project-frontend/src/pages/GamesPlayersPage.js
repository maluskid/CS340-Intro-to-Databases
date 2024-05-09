import React from 'react';
import DataTable from "../components/DataTable";

export default function GamesPlayersPage() {

  // placeholder for GET request to view games-players table from database
  const gamesPlayersTable = [{
    gameID: "FK Game ID",
    playerID: "FK Player ID",
    primaryKey: "(gameID, playerID)"
  }]
  return (
    <div>
      <DataTable currentTable={gamesPlayersTable} />
    </div >
  );
}
