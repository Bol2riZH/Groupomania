import React from 'react';

import classes from './Home.module.scss';
import Card from '../../UI/Card';

const Home = () => {
  return (
    <Card className={classes.home}>
      <h1>HOME</h1>
      <img src="./B2Rprofile.png" alt="B2R" />
    </Card>
  );
};

export default Home;
