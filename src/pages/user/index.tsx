import React from 'react';
import { Link } from 'react-router-dom';

function User() {
  return (
    <div>
      <header>
        <Link to="/home">Back home</Link>
      </header>
      User
    </div>
  );
}

export default User;
