import React, { useState } from 'react';
import axios from 'axios';

import Button from '../../UI/Button';
import Card from '../../UI/Card';

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
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
      });
  };

  return (
    <Card>
      <h1>LOGIN</h1>
      <form onSubmit={submitHandler}>
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
        <Button type="submit">Envoyer</Button>
      </form>
    </Card>
  );
};

export default Login;
