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
        <NavLink to="/login">
          <li>Login</li>
        </NavLink>
        <NavLink to="/logout">
          <li>Logout</li>
        </NavLink>
        <NavLink to="/update-user">
          <li>Update user</li>
        </NavLink>
        <NavLink to="/list-users">
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
