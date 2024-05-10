import './App.css';
import React, { useState } from 'react';
import Navigation from './components/Navigation';

function App() {

  const defaultNavList = [
    { path: "/", title: "Home" },
    { path: "/players-page", title: "Players" },
    { path: "/teams-page", title: "Teams" },
    { path: "/games-page", title: "Games" },
    { path: "/users-page", title: "Users" },
    { path: "/ratings-page", title: "Ratings" },
    { path: "/games-players-page", title: "Intersection Table" },
    { path: "/all-data-page", title: "All Data" },
    { path: "/select-page", title: "Search" }
  ];

  const [navList, setNavList] = useState(defaultNavList);

  return (
    <div className="App">
      <header className="App-header">
        <h1>NBA Database Data Entry and Editing</h1>
        <nav className="App-Navigation">
          <Navigation navList={navList} setNavList={setNavList} />
        </nav>
      </header>
    </div>
  );
}

export default App;
