import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <ul>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/signup">
          <li>signup</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
