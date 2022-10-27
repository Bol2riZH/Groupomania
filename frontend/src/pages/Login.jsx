import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { axiosUser } from '../utils/axios';

import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';

import classes from './Login.module.scss';
import Error from '../components/UI/Error';

const Login = () => {
  const [signup, setSignup] = useState(false);
  const [log, setLog] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (log)
      setTimeout(() => {
        navigate('/home');
      }, 600);
  }, [log]);

  const accountHandler = () => {
    !signup ? setSignup(true) : setSignup(false);
    setIsValid(true);
  };

  const setLocalStorage = (userId) => {
    localStorage.setItem('auth', JSON.stringify(userId));
  };

  const loginHandler = async (userLogin) => {
    try {
      const res = await axiosUser.post('/login', {
        ...userLogin,
      });

      setIsValid(true);
      const userId = {
        id: res.data.userId,
        token: res.data.token,
        username: res.data.username,
        role: res.data.role,
      };
      setLocalStorage(userId);
      setLog(true);

      return userId;
    } catch (err) {
      setIsValid(false);
      console.error('email ou mot de passe incorrect : ' + err);
    }
  };

  const signupHandler = async (userInfo, userSignup) => {
    try {
      const res = await axiosUser.post(`/signup`, userInfo, {
        headers: {
          'content-type': 'multipart/form-utils',
        },
      });
      console.log(res.data);
      const userId = await loginHandler(userSignup);
      setLocalStorage(userId);
    } catch (err) {
      setIsValid(false);
      setLog(false);
      console.error('Nom utilisateur ou adresse email déjà utilisées : ' + err);
    }
  };

  return (
    <div className={classes.layout}>
      <h1>GROUPOMANIA</h1>
      <div className={classes.form}>
        {!signup ? (
          <>
            <div className={classes.titleContainer}>
              <h2>SE CONNECTER</h2>
            </div>
            {!isValid && (
              <Error className={classes.errorMain}>
                Email ou mot de passe incorrect
              </Error>
            )}
            <LoginForm
              onLogin={loginHandler}
              onAccountHandler={accountHandler}
            />
          </>
        ) : (
          <>
            <div className={classes.titleContainer}>
              <h2>CRÉER UN COMPTE</h2>
            </div>

            {!isValid && (
              <Error className={classes.errorMain}>
                Nom utilisateur ou adresse email déjà utilisées
              </Error>
            )}
            <SignupForm
              onSignup={signupHandler}
              onAccountHandler={accountHandler}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
