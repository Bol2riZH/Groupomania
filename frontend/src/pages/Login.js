import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { USER_URL } from '../data/constants';

import classes from './Login.module.scss';

import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [signup, setSignup] = useState(false);
  const [log, setLog] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (log)
      setTimeout(() => {
        navigate('/home');
      }, 1000);
  }, [log]);

  const accountHandler = () => {
    !signup ? setSignup(true) : setSignup(false);
  };

  const loginHandler = async (email, password) => {
    const res = await axios.post(`${USER_URL}login`, {
      email: email,
      password: password,
    });
    console.log(res.data);
    const user = {
      id: res.data.userId,
      token: res.data.token,
    };
    // setLog(true);
    return user;
  };

  const signupHandler = async (userInfo) => {
    const res = await axios.post(`${USER_URL}signup`, userInfo, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    // console.log(res.data);
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
