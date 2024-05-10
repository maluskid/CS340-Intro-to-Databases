import React from 'react';
import NavLink from './NavLink';
import HomePage from '../pages/HomePage';
import PlayersPage from '../pages/PlayersPage';
import TeamsPage from '../pages/TeamsPage';
import GamesPage from '../pages/GamesPage';
import UsersPage from '../pages/UsersPage';
import RatingsPage from '../pages/RatingsPage';
import GamesPlayersPage from '../pages/GamesPlayersPage';
import AllDataPage from '../pages/AllDataPage';
import SelectPage from '../pages/SelectPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Navigation({ navList, setNavList }) {

  return (
    <Router>
      <ul>
        {navList.map((info, i) => <NavLink
          info={info}
          setNavList={setNavList}
          key={i} />)}
      </ul>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/players-page" element={<PlayersPage />} />
        <Route path="/teams-page" element={<TeamsPage />} />
        <Route path="/games-page" element={<GamesPage />} />
        <Route path="/users-page" element={<UsersPage />} />
        <Route path="/ratings-page" element={<RatingsPage />} />
        <Route path="/games-players-page" element={<GamesPlayersPage />} />
        <Route path="/all-data-page" element={<AllDataPage />} />
        <Route path="/select-page" element={<SelectPage />} />
      </Routes>
    </Router>
  );
}

export default Navigation;
