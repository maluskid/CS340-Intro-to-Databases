import React, { useState } from 'react';
import DataTable from "../components/DataTable";


export default function GamesPage() {

  // placeholder for data entry for new game
  const [homeTeam, setHomeTeam] = useState(undefined);
  const [awayTeam, setAwayTeam] = useState(undefined);

  // placeholder for GET request to view games table from database
  const gamesTable = [{
    tableName: "Games",
    gameID: "Game ID",
    gameDate: "Game Date",
    homeTeam: "FK homeTeam ID",
    awayTeam: "FK awayTeam ID",
    homeTeamScore: 0,
    awayTeamScore: 0,
    overTime: 0,
    postSeason: true
  }];

  async function createNew() {
    const newItem = { homeTeam, awayTeam };
    // send POST with newItem 
  }

  return (
    <div className="App-Page">
      <DataTable currentTable={gamesTable} />
      <h4>Enter new Game</h4>
      <input
        type="text"
        placeholder="Home Team"
        value={homeTeam}
        onChange={e => setHomeTeam(e.target.value)} />
      <input
        type="text"
        placeholder="Away Team"
        value={awayTeam}
        onChange={e => setAwayTeam(e.target.value)} />
      <button onClick={createNew}>Insert</button>
    </div >
  );
}
