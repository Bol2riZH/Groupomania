import React, { useState } from 'react';
import axios from 'axios';

import Button from '../../UI/Button';
import Card from '../../UI/Card';
import PassswordRevealer from '../../components/PasswordRevealer';

const Login = () => {
  const [email, setEnteredEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:4000/api/auth/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        const user = {
          id: res.data.userId,
          token: res.data.token,
        };
        localStorage.setItem('user', JSON.stringify(user));
      });
  };

  return (
    <Card>
      <h1>LOGIN</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email: </label>
        <input id="email" type="text" onChange={emailHandler} />
        <label htmlFor="password">Password: </label>
        <PassswordRevealer id="password" onChange={passwordHandler} />
        <Button type="submit">Login</Button>
      </form>
    </Card>
  );
};

export default Login;
