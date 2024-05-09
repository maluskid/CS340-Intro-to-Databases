import React from 'react';
import DataTable from "../components/DataTable";

export default function GamesPlayersPage() {

  // placeholder for GET request to view games-players table from database
  const gamesPlayersTable = [{
    tableName: "Games Players Intersection",
    gameID: "FK Game ID",
    playerID: "FK Player ID",
    primaryKey: "(gameID, playerID)"
  }]
  return (
    <div className="App-Page">
      <DataTable currentTable={gamesPlayersTable} />
    </div >
  );
}
