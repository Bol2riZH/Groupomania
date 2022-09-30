import React, { useState } from 'react';

import axios from 'axios';
import { USER_URL } from '../../data/constants';

import Button from '../UI/Button';
import Input from '../UI/Input';

const LoginForm = () => {
  const [email, setEnteredEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (email, password) => {
    const res = await axios.post(`${USER_URL}login`, {
      email: email,
      password: password,
    });
    console.log(res.data);
    return {
      id: res.data.userId,
      token: res.data.token,
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const user = await loginHandler(email, password).catch(console.error);
    user
      ? localStorage.setItem('user', JSON.stringify(user))
      : console.log('Incorrect email or password');
  };

  return (
    <form onSubmit={submitHandler}>
      <Input
        type="email"
        htmlFor="email"
        id="email"
        placeHolder="Email"
        onChange={emailHandler}
      />
      <Input
        type="password"
        htmlFor="password"
        id="password"
        placeHolder="Mot de passe"
        onChange={passwordHandler}
      />
      <Button type="submit">Connexion</Button>
    </form>
  );
};

export default LoginForm;
