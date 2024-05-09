import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="App-Navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/players-page">Players</Link>
        </li>
        <li>
          <Link to="/teams-page">Teams</Link>
        </li>
        <li>
          <Link to="/games-page">Games</Link>
        </li>
        <li>
          <Link to="/users-page">Users</Link>
        </li>
        <li>
          <Link to="/ratings-page">Ratings</Link>
        </li>
        <li>
          <Link to="/games-players-page">Intersection Table</Link>
        </li>
        <li>
          <Link to="/all-data-page">All Data</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
