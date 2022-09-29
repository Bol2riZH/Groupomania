import React from 'react';

import CardTest from '../UI/Card.test';
import ButtonTest from '../UI/Button.test';
import classes from './Logout.module.scss';

const LogoutTest = () => {
  const logoutHandler = () => {
    localStorage.clear();
    console.log('user logout');
  };

  return (
    <CardTest className={classes.center}>
      <h1>LOGOUT</h1>
      <ButtonTest onClick={logoutHandler}>Logout</ButtonTest>
    </CardTest>
  );
};

export default LogoutTest;
