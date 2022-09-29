import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navigation.module.scss';

const NavigationTest = () => {
  return (
    <div className={classes.nav}>
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
      <ul>
        <NavLink to="/add-post">
          <li>Add a post</li>
        </NavLink>
        <NavLink to="/list-posts">
          <li>List of posts</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default NavigationTest;
