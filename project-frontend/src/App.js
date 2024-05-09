import './App.css';
import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import PlayersPage from './pages/PlayersPage';
import TeamsPage from './pages/TeamsPage';
import GamesPage from './pages/GamesPage';
import UsersPage from './pages/UsersPage';
import RatingsPage from './pages/RatingsPage';
import GamesPlayersPage from './pages/GamesPlayersPage';
import AllDataPage from './pages/AllDataPage';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NBA Database Data Entry and Editing</h1>
      </header>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/players-page" element={<PlayersPage />} />
          <Route path="/teams-page" element={<TeamsPage />} />
          <Route path="/games-page" element={<GamesPage />} />
          <Route path="/users-page" element={<UsersPage />} />
          <Route path="/ratings-page" element={<RatingsPage />} />
          <Route path="/games-players-page" element={<GamesPlayersPage />} />
          <Route path="/all-data-page" element={<AllDataPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
