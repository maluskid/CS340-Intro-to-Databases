import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the HomePage component
function HomePage() {

  return (
    <div className="App-Page">
      <h2>About</h2>
      <p>The Film Fiends company would like to expand to include sports media, particularly the National Basketball Association (NBA). They would like to create a website that is driven by a relational database that stores user created NBA game reviews. Users can go into the database and review games that they’ve watched so others know what the fun matchups and tense finishes are when they go to watch VODs. Users will also be able to choose their favorite team and player. General information about each game, such as the teams that played and the final score, will also be available to users. The database will store information about teams, games, players, users and ratings. The NBA has 30 teams, each team has 12 players, and each team plays 82 regular season games. The postseason can consist of up to 105 games total among 16 teams. The website should be able to support at least 10,000 users.</p>
    </div>
  );
}
export default HomePage;
