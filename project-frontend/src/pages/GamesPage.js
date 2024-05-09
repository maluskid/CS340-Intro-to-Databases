import React from 'react';
import DataTable from "../components/DataTable";

export default function GamesPage() {

  // placeholder for GET request to view games table from database
  const gamesTable = [{
    gameID: "Game ID",
    gameDate: "Game Date",
    homeTeam: "FK homeTeam ID",
    awayTeam: "FK awayTeam ID",
    homeTeamScore: 0,
    awayTeamScore: 0,
    overTime: 0,
    postSeason: true
  }]
  return (
    <div>
      <DataTable currentTable={gamesTable} />
    </div >
  );
}
