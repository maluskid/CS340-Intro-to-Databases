import React, { useState } from 'react';

export default function SelectPage() {
  const [tableName, setTableName] = useState(undefined);
  const [playerID, setPlayerID] = useState(undefined);
  const [teamID, setTeamID] = useState(undefined);
  const [gameID, setGameID] = useState(undefined);
  const [userID, setUserID] = useState(undefined);
  const [reviewID, setReviewID] = useState(undefined);

  async function runQuery() {
    const formValues = { tableName, playerID, teamID, gameID, userID, reviewID };
    let searchValues = {};
    for (let key in formValues) {
      if (formValues[key] !== undefined) {
        searchValues[key] = formValues[key];
      }
    }
  }

  return (
    <div>
      <h2>Enter Values to Search</h2>
      <input
        type="text"
        placeholder="Name of Table"
        value={tableName}
        onChange={e => setTableName(e.target.value)} />
      <input
        type="number"
        placeholder="Player ID"
        value={playerID}
        onChange={e => setPlayerID(e.target.value)} />
      <input
        type="number"
        placeholder="Team ID"
        value={teamID}
        onChange={e => setTeamID(e.target.value)} />
      <input
        type="number"
        placeholder="Game ID"
        value={gameID}
        onChange={e => setGameID(e.target.value)} /><br />
      <input
        type="number"
        placeholder="userID"
        value={userID}
        onChange={e => setUserID(e.target.value)} /><br />
      <input
        type="number"
        placeholder="Review ID"
        value={reviewID}
        onChange={e => setReviewID(e.target.value)} /><br />
      <button onClick={runQuery}>Query</button>
    </div>
  );
}


