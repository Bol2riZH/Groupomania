import React, { useState } from 'react';

import Input from '../UI/Input';
import Button from '../UI/Button';

const LoginForm = (props) => {
  const [email, setEnteredEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    props.onLogin(email, password);
  };

  return (
    <>
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
    </>
  );
};

export default LoginForm;
