import React from 'react';
import classes from '../../styles/pages/backendTest/_Signup.module.scss';

import Navigation from '../../components/Navigation';
import Button from '../../UI/Button';

const Signup = () => {
  return (
    <>
      <Navigation />

      <div>
        <h1>SIGNUP</h1>
        <form action="">
          <label htmlFor="email">Email: </label>
          <input id="email" type="text" />
          <label htmlFor="password">Password: </label>
          <input id="password" type="text" />
          <label htmlFor="confirm-password">Confirm password: </label>
          <input id="confirm-password" type="text" />
          <Button type="submit">Envoyer</Button>
        </form>
      </div>
    </>
  );
};

export default Signup;
