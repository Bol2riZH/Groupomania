import React, { useState } from 'react';
import classes from './Login.module.scss';

import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';

const Login = () => {
  const [signup, setSignup] = useState(false);

  const accountHandler = () => {
    !signup ? setSignup(true) : setSignup(false);
  };

  return (
    <div className={classes.layout}>
      <Card>
        <h1>GROUPOMANIA</h1>
        {!signup ? (
          <>
            <LoginForm />
            <Button className={classes.btn} type="submit">
              Connexion
            </Button>

            <Button onClick={accountHandler} className={classes.btn}>
              Pas encore de compte ?
            </Button>
          </>
        ) : (
          <>
            <SignupForm />
            <Button className={classes.btn} type="submit">
              Créer un compte
            </Button>

            <Button onClick={accountHandler} className={classes.btn}>
              Retour
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default Login;
