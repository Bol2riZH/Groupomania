import React from 'react';
import { NavLink } from 'react-router-dom';

import './_Navigation.module.scss';

const Navigation = () => {
  return (
    <div>
      <ul>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/signup">
          <li>Signup</li>
        </NavLink>
        <NavLink to="/list-of-user">
          <li>List of users</li>
        </NavLink>
        <NavLink to="/search-user">
          <li>Search a user</li>
        </NavLink>
        <NavLink to="/delete-user">
          <li>Delete a user</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
