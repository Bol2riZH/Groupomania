import React, { useEffect, useState } from 'react';
import classes from './Login.module.scss';

import { axiosUser } from '../data/axios';

import { useNavigate } from 'react-router-dom';

import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';

const Login = () => {
  const [signup, setSignup] = useState(false);
  const [log, setLog] = useState(false);

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

      const userId = {
        id: res.data.userId,
        token: res.data.token,
        role: res.data.role,
      };
      setLocalStorage(userId);
      setLog(true);

      return userId;
    } catch (err) {
      console.log(err);
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
      console.log(err);
    }
  };

  return (
    <div className={classes.layout}>
      <Card className={classes.form}>
        <h1>GROUPOMANIA</h1>
        {!signup ? (
          <>
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
