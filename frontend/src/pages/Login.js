import React, { useEffect, useState } from 'react';
import classes from './Login.module.scss';

import axios from 'axios';
import { USER_URL } from '../data/constants';

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

  const SetLocalStorage = (userId) => {
    localStorage.setItem('user', JSON.stringify(userId));
  };

  const loginHandler = async (email, password) => {
    const res = await axios.post(`${USER_URL}login`, {
      email: email,
      password: password,
    });
    console.log(res.data);
    const userId = {
      id: res.data.userId,
      token: res.data.token,
    };
    SetLocalStorage(userId);
    setLog(true);
    return userId;
  };

  const signupHandler = async (userInfo, email, password) => {
    const res = await axios.post(`${USER_URL}signup`, userInfo, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    console.log(res.data);
    const userId = await loginHandler(email, password);
    SetLocalStorage(userId);
    setLog(true);
  };

  return (
    <div className={classes.layout}>
      <Card>
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
