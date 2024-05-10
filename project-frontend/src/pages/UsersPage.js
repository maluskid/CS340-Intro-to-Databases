import React from 'react';
import DataTable from "../components/DataTable";

export default function PlayersPage() {

  // placeholder for data entry for new game
  const [userName, setUserName] = useState(undefined);
  const [favoriteTeam, setFavoriteTeam] = useState(undefined);

  async function createNew() {
    const newItem = { homeTeam, awayTeam };
    // send POST with newItem 
  }

  // Placeholder for GET request to database
  const usersTable = [{
    tableName: "Users",
    userID: "User ID",
    userName: "User Name",
    favoriteTeam: "FK Team ID",
    favoritePlayer: "FK Player ID",
  }];

  return (
    <div className="App-Page">
      <DataTable currentTable={usersTable} />
      <input
        type="text"
        placeholder="User Name"
        value={userName}
        onChange={e => setUserName(e.target.value)} />
      <input
        type="text"
        placeholder="Favorite Team"
        value={favoriteTeam}
        onChange={e => setFavoriteTeam(e.target.value)} />
      <button onClick={createNew}>Insert</button>
    </div >
  );
}
