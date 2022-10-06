import React, { useState } from 'react';
import axios from 'axios';

import Button from '../UI/Button';
import Card from '../UI/Card';

const Login = () => {
  const [email, setEnteredEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const postData = async (email, password) => {
    const res = await axios.post('http://localhost:4000/api/auth/login', {
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

    const user = await postData(email, password).catch(console.error);
    user
      ? localStorage.setItem('user', JSON.stringify(user))
      : console.log('Incorrect email or password');
  };

  return (
    <Card>
      <h1>LOGIN</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email: </label>
        <input id="email" type="email" onChange={emailHandler} />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" onChange={passwordHandler} />
        <Button type="submit">Login</Button>
      </form>
    </Card>
  );
};

export default Login;
