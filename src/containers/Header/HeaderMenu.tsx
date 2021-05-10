import React from 'react';
import { Link } from 'react-router-dom';

function HeaderMenu() {
  return (
    <div className="headerContainer">
      <Link to="/">Back default</Link>
      <Link to="/home">Back home</Link>
      <Link to="/sell">Back sell</Link>
      <Link to="/user">Back user</Link>
    </div>
  );
}

export default HeaderMenu;
