import React, { useState } from 'react';

import Input from '../UI/Input';
import Button from '../UI/Button';

const LoginForm = (props) => {
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });
  const [shown, setShown] = React.useState(false);

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
          value={userLogin.email}
          onChange={loginHandler}
        />
        <Input
          name="password"
          type={shown ? 'text' : 'password'}
          htmlFor="password"
          id="password"
          placeHolder="Mot de passe"
          value={userLogin.password}
          onChange={loginHandler}
        />
        <button type="button" onClick={() => setShown(!shown)}>
          voir/cacher
        </button>
        <Button type="submit">Connexion</Button>
      </form>
    </>
  );
};

export default LoginForm;
