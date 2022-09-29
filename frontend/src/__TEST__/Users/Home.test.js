import React from 'react';

import classes from './Home.module.scss';
import CardTest from '../UI/Card.test';

const HomeTest = () => {
  return (
    <CardTest className={classes.home}>
      <h1>HOME</h1>
      <img src="./B2Rprofile.png" alt="B2R" />
    </CardTest>
  );
};

export default HomeTest;
