import React, { useState } from 'react';

import Input from '../UI/Input';
import Button from '../UI/Button';

const LoginForm = (props) => {
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    props.onLogin(userLogin);
  };

  const loginHandler = (e) => {
    setUserLogin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <Input
          name="email"
          type="email"
          htmlFor="email"
          id="email"
          placeHolder="Email"
          onChange={loginHandler}
        />
        <Input
          name="password"
          type="password"
          htmlFor="password"
          id="password"
          placeHolder="Mot de passe"
          onChange={loginHandler}
        />
        <Button type="submit">Connexion</Button>
      </form>
    </>
  );
};

export default LoginForm;