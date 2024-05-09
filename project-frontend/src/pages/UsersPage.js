import React from 'react';
import DataTable from "../components/DataTable";

export default function PlayersPage() {

  // Placeholder for GET request to database
  const usersTable = [{
    userID: "User ID",
    userName: "User Name",
    favroiteTeam: "FK Team ID",
    favoritePlayer: "FK Player ID",
  }]
  return (
    <div>
      <DataTable currentTable={usersTable} />
    </div >
  );
}
