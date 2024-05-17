import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeamsPage from "./pages/TeamsPage";
import PlayersPage from "./pages/PlayersPage";
import GamesPage from "./pages/GamesPage";
import GamesHasPlayersPage from "./pages/GamesHasPlayersPage";
import RatingsPage from "./pages/RatingsPage";
import UsersPage from "./pages/UsersPage";
import Navbar from "./components/navbar/NavBar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teams/*" element={<TeamsPage />} />
        <Route path="/players/*" element={<PlayersPage />} />
        <Route path="/games/*" element={<GamesPage />} />
        <Route path="/gamesHasPlayers/*" element={<GamesHasPlayersPage />} />
        <Route path="/ratings/*" element={<RatingsPage />} />
        <Route path="/users/*" element={<UsersPage />} />



      </Routes>
    </>
  );
}

export default App;
