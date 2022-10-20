import React, { useState, useReducer } from 'react';

import {
  LOG_INITIAL_STATE,
  ACTIONS,
  loginReducer,
} from '../Reducer/loginReducer';

import classes from './LoginForm.module.scss';
import Input from '../UI/Input';
import Error from '../UI/Error';
import ButtonConfirmation from '../UI/ButtonConfirmation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = (props) => {
  const [state, dispatch] = useReducer(loginReducer, LOG_INITIAL_STATE);
  const [shown, setShown] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.IS_VALID,
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
    <form onSubmit={submitHandler}>
      {/*/////////// EMAIL //////////////*/}
      {!state.isValidEmail ? (
        <Error className={classes.error}>Veuillez entrer un email valide</Error>
      ) : (
        ''
      )}
      <Input
        className={classes.input}
        name="email"
        type="text"
        htmlFor="email"
        id="email"
        placeHolder="Email"
        value={state.email}
        onChange={loginHandler}
        isValid={state.isValidEmail}
      />

      {/*/////////// PASSWORD //////////////*/}
      {!state.isValidPassword ? (
        <Error className={classes.error}>
          Veuillez entrer un mot de passe valide
        </Error>
      ) : (
        ''
      )}
      <Input
        className={`${classes.input} ${classes.passwordLabel}
        }`}
        name="password"
        type={shown ? 'text' : 'password'}
        htmlFor="password"
        id="password"
        placeHolder="Mot de passe"
        value={state.password}
        onChange={loginHandler}
        isValid={state.isValidPassword}
        label={
          !shown ? (
            <FaEyeSlash onClick={() => setShown(!shown)} />
          ) : (
            <FaEye onClick={() => setShown(!shown)} />
          )
        }
      />
      <div className={classes.footer}>
        <ButtonConfirmation type="submit">CONNEXION</ButtonConfirmation>
        <a onClick={props.onAccountHandler}>Pas encore de compte ?</a>
      </div>
    </form>
  );
};

export default LoginForm;
