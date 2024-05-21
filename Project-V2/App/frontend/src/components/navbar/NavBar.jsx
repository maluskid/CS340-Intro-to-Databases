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
        <ul>
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
