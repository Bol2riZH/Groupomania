import React, { useState, useReducer } from 'react';
import {
  ACTIONS,
  USER_INITIAL_STATE,
  signupReducer,
} from '../Reducer/signupReducer';
import { formData } from '../../data/formData';

import Input from '../UI/Input';
import Button from '../UI/Button';
import Error from '../UI/Error';

const SignupForm = (props) => {
  const [state, dispatch] = useReducer(signupReducer, USER_INITIAL_STATE);
  const [shown, setShown] = useState(false);
  const [isEmptyForm, setIsEmptyForm] = useState(null);

  const inputHandler = (e) => {
    dispatch({
      type: ACTIONS.INPUT,
      payload:
        e.target.name === 'profilePictureUrl'
          ? { name: e.target.name, files: e.target.files[0] }
          : { name: e.target.name, value: e.target.value },
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.IS_VALID,
    });
    const formInput = [];
    state.username && formInput.push(state.isValidUsername);
    state.email && formInput.push(state.isValidEmail);
    state.confirmEmail && formInput.push(state.isValidConfirmEmail);
    state.password && formInput.push(state.isValidPassword);
    state.confirmPassword && formInput.push(state.isValidConfirmPassword);

    // check if the form fully empty //
    formInput.length === 0 ? setIsEmptyForm(true) : setIsEmptyForm(false);

    // check if the form is fill with no errors before post//
    if (!isEmptyForm && isEmptyForm !== null && formInput.length === 5) {
      props.onSignup(formData(state), state);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      {isEmptyForm && <Error>Formulaire non remplie</Error>}
      <Input
        name="profilePictureUrl"
        htmlFor="profilePicture"
        id="profilePicture"
        type="file"
        value={state}
        onChange={inputHandler}
      />
      {!state.isValidProfilPicture ? (
        <Error>Taille maximum autorisé 1Mo</Error>
      ) : (
        ''
      )}
      <Input
        name="username"
        htmlFor="username"
        id="username"
        placeHolder="Nom d'utilisateur"
        value={state}
        onChange={inputHandler}
      />
      {!state.isValidUsername ? (
        <Error>Veuillez entrer nom d'utilisateur</Error>
      ) : (
        ''
      )}
      <Input
        name="email"
        htmlFor="email"
        id="email"
        placeHolder="Email"
        onChange={inputHandler}
      />
      {!state.isValidEmail ? (
        <Error>Veuillez entrer un email valide</Error>
      ) : (
        ''
      )}
      <Input
        name="confirmEmail"
        htmlFor="confirmEmail"
        id="confirmEmail"
        placeHolder="Confirmer votre adresse mail"
        value={state}
        onChange={inputHandler}
      />
      {!state.isValidConfirmEmail ? (
        <Error>Les adresses email ne sont pas identiques</Error>
      ) : (
        ''
      )}
      <Input
        name="password"
        htmlFor="password"
        id="password"
        type={shown ? 'text' : 'password'}
        placeHolder="Mot de passe"
        value={state}
        onChange={inputHandler}
      />
      {!state.isValidPassword ? (
        <Error>Veuillez entrer un mot de passe valide</Error>
      ) : (
        ''
      )}
      <Input
        name="confirmPassword"
        htmlFor="confirmPassword"
        id="confirmPassword"
        type={shown ? 'text' : 'password'}
        placeHolder="Confirmer le mot de passe"
        value={state}
        onChange={inputHandler}
      />
      {!state.isValidConfirmPassword ? (
        <Error>Les mot de passe ne sont pas identiques</Error>
      ) : (
        ''
      )}
      <button type="button" onClick={() => setShown(!shown)}>
        voir/cacher
      </button>
      <Button type="submit">Créer un compte</Button>
    </form>
  );
};

export default SignupForm;
