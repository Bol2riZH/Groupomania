import React, { useState } from 'react';

import Input from '../UI/Input';
import Button from '../UI/Button';

const LoginForm = (props) => {
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });
  const [shown, setShown] = React.useState(false);
  const [isValid, setIsValid] = useState({
    email: true,
    password: true,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!userLogin.email.includes('@')) {
      setIsValid((prevState) => ({
        ...prevState,
        email: false,
      }));
    } else {
      setIsValid((prevState) => ({
        ...prevState,
        email: true,
      }));
      if (userLogin.password.length < 6) {
        setIsValid((prevState) => ({
          ...prevState,
          password: false,
        }));
      }
    }
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
          isValid={isValid.email}
        />
        {!isValid.email ? <p>Veuillez entrer un email valide</p> : ''}
        <Input
          name="password"
          type={shown ? 'text' : 'password'}
          htmlFor="password"
          id="password"
          placeHolder="Mot de passe"
          value={userLogin.password}
          onChange={loginHandler}
          isValid={isValid.password}
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
