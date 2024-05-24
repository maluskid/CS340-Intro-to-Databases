import React from 'react';
import { Link } from 'react-router-dom';

export default function NavLink({ info, setNavList }) {

  function checkPath() {
    if (info.path === '/') {
      setNavList([
        { path: "/", title: "Home" },
        { path: "/players-page", title: "Players" },
        { path: "/teams-page", title: "Teams" },
        { path: "/games-page", title: "Games" },
        { path: "/users-page", title: "Users" },
        { path: "/ratings-page", title: "Ratings" },
        { path: "/games-players-page", title: "Intersection Table" },
        { path: "/all-data-page", title: "All Data" },
        { path: "/select-page", title: "Search" }
      ]);
    } else {
      setNavList([
        { path: "/", title: "Home" }
      ]);
    }
  }

  return (
    <li><Link to={info.path} onClick={() => checkPath}>{info.title}</Link></li>
  );
}
