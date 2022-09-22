import React, { useState } from 'react';
import axios from 'axios';
import classes from '../../styles/pages/backendTest/_Signup.module.scss';

import Navigation from '../../components/Navigation';
import Button from '../../UI/Button';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEnteredEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const emailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios.post('http://localhost:4000/api/auth/signup', {
      username,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <>
      <Navigation />

      <div>
        <h1>SIGNUP</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="email">username: </label>
          <input
            id="username"
            type="text"
            onChange={usernameHandler}
            defaultValue={username}
          />
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="text"
            onChange={emailHandler}
            defaultValue={email}
          />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="text"
            onChange={passwordHandler}
            defaultValue={password}
          />
          <label htmlFor="confirm-password">Confirm password: </label>
          <input
            id="confirm-password"
            type="text"
            onChange={confirmPasswordHandler}
            defaultValue={confirmPassword}
          />
          <Button type="submit">Envoyer</Button>
        </form>
      </div>
    </>
  );
};

export default Signup;
