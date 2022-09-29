import React from 'react';
import classes from './Login.module.scss';

import Card from '../components/UI/Card';
import LoginForm from '../components/Auth/LoginForm';

const Login = () => {
  return (
    <div className={classes.layout}>
      <Card>
        <h1>GROUPOMANIA</h1>
        <LoginForm />
      </Card>
    </div>
  );
};

export default Login;
