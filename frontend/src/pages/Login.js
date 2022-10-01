import React, { useState } from 'react';
import classes from './Login.module.scss';

import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';

const Login = () => {
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const accountHandler = () => {
    !signup ? setSignup(true) : setSignup(false);
  };

  const getSignupData = (email, password) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className={classes.layout}>
      <Card>
        <h1>GROUPOMANIA</h1>
        {!signup ? (
          <>
            <LoginForm sendEmail={email} sendPassword={password} />
            <Button onClick={accountHandler} className={classes.btn__signup}>
              Pas encore de compte ?
            </Button>
          </>
        ) : (
          <>
            <SignupForm onSignup={getSignupData} />
            <Button onClick={accountHandler} className={classes.btn__signup}>
              Retour
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default Login;
