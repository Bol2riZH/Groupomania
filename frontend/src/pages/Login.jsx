import React, { useEffect, useState } from 'react';
import classes from './Login.module.scss';

import { axiosUser } from '../data/axios';

import { useNavigate } from 'react-router-dom';

import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Error from '../components/UI/Error';

import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';

const Login = () => {
  const [signup, setSignup] = useState(false);
  const [log, setLog] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (log)
      setTimeout(() => {
        navigate('/home');
      }, 600);
  }, [log]);

  const accountHandler = () => {
    !signup ? setSignup(true) : setSignup(false);
  };

  const setLocalStorage = (userId) => {
    localStorage.setItem('auth', JSON.stringify(userId));
  };

  const loginHandler = async (userLogin) => {
    try {
      const res = await axiosUser.post('/login', {
        ...userLogin,
      });
      console.log(res.data);

      setIsValid(false);
      const userId = {
        id: res.data.userId,
        token: res.data.token,
        role: res.data.role,
      };
      setLocalStorage(userId);
      setLog(true);

      return userId;
    } catch (err) {
      setIsValid(true);
      console.error('email ou mot de passe incorrect : ' + err);
    }
  };

  const signupHandler = async (userInfo, userSignup) => {
    console.log(userSignup);
    try {
      const res = await axiosUser.post(`/signup`, userInfo, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      const userId = await loginHandler(userSignup);
      setLocalStorage(userId);
    } catch (err) {
      setLog(false);
      console.error('Impossible de vous créer un compte : ' + err);
    }
  };

  return (
    <div className={classes.layout}>
      <Card className={classes.form}>
        <h1>GROUPOMANIA</h1>
        {!signup ? (
          <>
            {isValid && <Error>Email ou mot de passe incorrect</Error>}
            <LoginForm onLogin={loginHandler} />
            <Button onClick={accountHandler} className={classes.btn}>
              Pas encore de compte ?
            </Button>
          </>
        ) : (
          <>
            <SignupForm onSignup={signupHandler} />
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
