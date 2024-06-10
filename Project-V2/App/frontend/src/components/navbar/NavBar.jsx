// Authors: Denyse Tolentino and Dominic Maluski
// Contents: Film Fiends NBA Database
// Citation for component:
// Date: 05/16/2024
// Adapted from CS340 OSU Course
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { Link } from "react-router-dom";
import { SiNba } from "react-icons/si";

const Navbar = () => {
  return (
    <header>
      <div>
        <SiNba size={160} />
      </div>
      <h1>Film Fiends NBA Database</h1>
      <nav>
        <ul className="navBar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/teams">Teams</Link>
          </li>
          <li>
            <Link to="/players">Players</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
          <li>
            <Link to="/gamesHasPlayers">Games Has Players</Link>
          </li>
          <li>
            <Link to="/ratings">Ratings</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
