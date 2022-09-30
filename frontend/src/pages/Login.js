import React, { useState } from 'react';
import classes from './Login.module.scss';

import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';

const Login = () => {
  const [signup, setSignup] = useState(false);

  const LogHandler = () => {
    !signup ? setSignup(true) : setSignup(false);
  };

  return (
    <div className={classes.layout}>
      <Card>
        <h1>GROUPOMANIA</h1>
        {!signup ? (
          <>
            <LoginForm />
            <Button onClick={LogHandler} className={classes.btn__signup}>
              Pas encore de compte ?
            </Button>
          </>
        ) : (
          <>
            <SignupForm />
            <Button onClick={LogHandler} className={classes.btn__signup}>
              Retour
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default Login;
