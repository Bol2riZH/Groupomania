import React, { useState, useReducer } from 'react';
import { LOG_INITIAL_STATE, ACTIONS, logReducer } from '../Reducer/logReducer';

import Input from '../UI/Input';
import Button from '../UI/Button';
import Error from '../UI/Error';

const LoginForm = (props) => {
  const [state, dispatch] = useReducer(logReducer, LOG_INITIAL_STATE);
  const [shown, setShown] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.IS_VALID_EMAIL,
    });
    dispatch({
      type: ACTIONS.IS_VALID_PASSWORD,
    });
    props.onLogin(state);
  };

  const loginHandler = (e) => {
    dispatch({
      type: ACTIONS.INPUT_TEXT,
      payload: { name: e.target.name, value: e.target.value },
    });
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
          value={state.email}
          onChange={loginHandler}
          isValid={state.isValidEmail}
        />
        {!state.isValidEmail ? (
          <Error>Veuillez entrer un email valide</Error>
        ) : (
          ''
        )}
        <Input
          name="password"
          type={shown ? 'text' : 'password'}
          htmlFor="password"
          id="password"
          placeHolder="Mot de passe"
          value={state.password}
          onChange={loginHandler}
          isValid={state.isValidPassword}
        />
        {!state.isValidPassword ? (
          <Error>Veuillez entrer un mot de passe valide</Error>
        ) : (
          ''
        )}
        <button type="button" onClick={() => setShown(!shown)}>
          voir/cacher
        </button>
        <Button type="submit">Connexion</Button>
      </form>
    </>
  );
};

export default LoginForm;
