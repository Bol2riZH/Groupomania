import React, { useState } from 'react';
import { USER_URL } from '../../data/constants';
import axios from 'axios';

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
      <Input type="email" onChange={emailHandler} />
      <Input type="password" onChange={passwordHandler} />
      <Button type="submit">Se connecter</Button>
      <Button>Créer un nouveau compte</Button>
    </form>
  );
};

export default LoginForm;
