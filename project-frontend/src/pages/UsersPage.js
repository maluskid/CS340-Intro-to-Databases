import React from 'react';
import DataTable from "../components/DataTable";

export default function PlayersPage() {

  // Placeholder for GET request to database
  const usersTable = [{
    tableName: "Users",
    userID: "User ID",
    userName: "User Name",
    favroiteTeam: "FK Team ID",
    favoritePlayer: "FK Player ID",
  }]
  return (
    <div className="App-Page">
      <DataTable currentTable={usersTable} />
    </div >
  );
}
