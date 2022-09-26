import React from 'react';

import Card from '../../UI/Card';
import Button from '../../UI/Button';
import classes from './Logout.module.scss';

const Logout = () => {
  const logoutHandler = () => {
    localStorage.clear();
  };

  return (
    <Card className={classes.center}>
      <h1>LOGIN</h1>
      <Button onClick={logoutHandler}>Logout</Button>
    </Card>
  );
};

export default Logout;
