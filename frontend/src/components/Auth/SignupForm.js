import React, { useReducer } from 'react';
import { signupReducer, ACTIONS, INITIAL_STATE } from './signupReducer';

import Input from '../UI/Input';
import Button from '../UI/Button';

const SignupForm = (props) => {
  const [state, dispatch] = useReducer(signupReducer, INITIAL_STATE);

  const signupHandler = (e) => {
    dispatch({
      type: ACTIONS.INPUT_TEXT,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const profilePictureHandler = (e) => {
    dispatch({
      type: ACTIONS.INPUT_FILE,
      payload: { name: e.target.name, files: e.target.files[0] },
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('profilePictureUrl', state.profilePictureUrl);
    formData.append('username', state.username);
    formData.append('email', state.email);
    formData.append('password', state.password);
    formData.append('confirmPassword', state.confirmPassword);

    props.onSignup(formData, state);
  };

  return (
    <form onSubmit={submitHandler}>
      <Input
        name="profilePictureUrl"
        htmlFor="profilePicture"
        id="profilePicture"
        type="file"
        onChange={profilePictureHandler}
      />
      <Input
        name="username"
        htmlFor="username"
        id="username"
        placeHolder="Nom d'utilisateur"
        onChange={signupHandler}
      />
      <Input
        name="email"
        htmlFor="email"
        id="email"
        placeHolder="Email"
        onChange={signupHandler}
      />
      <Input
        name="password"
        htmlFor="password"
        id="password"
        type="password"
        placeHolder="Mot de passe"
        onChange={signupHandler}
      />
      <Input
        name="confirmPassword"
        htmlFor="confirmPassword"
        id="confirmPassword"
        type="password"
        placeHolder="Confirmer le mot de passe"
        onChange={signupHandler}
      />
      <Button type="submit">Créer un compte</Button>
    </form>
  );
};

export default SignupForm;
