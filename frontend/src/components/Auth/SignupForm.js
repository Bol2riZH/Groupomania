import React, { useReducer } from 'react';
import {
  profileReducer,
  ACTIONS,
  INITIAL_STATE,
} from '../Reducer/Profile/profileReducer';

import Input from '../UI/Input';
import Button from '../UI/Button';

const SignupForm = (props) => {
  const [state, dispatch] = useReducer(profileReducer, INITIAL_STATE);

  const inputHandler = (e) => {
    if (e.target.name === 'profilePictureUrl') {
      dispatch({
        type: ACTIONS.INPUT_FILE,
        payload: { name: e.target.name, files: e.target.files[0] },
      });
    } else {
      dispatch({
        type: ACTIONS.INPUT_TEXT,
        payload: { name: e.target.name, value: e.target.value },
      });
    }
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
        onChange={inputHandler}
      />
      <Input
        name="username"
        htmlFor="username"
        id="username"
        placeHolder="Nom d'utilisateur"
        onChange={inputHandler}
      />
      <Input
        name="email"
        htmlFor="email"
        id="email"
        placeHolder="Email"
        onChange={inputHandler}
      />
      <Input
        name="password"
        htmlFor="password"
        id="password"
        type="password"
        placeHolder="Mot de passe"
        onChange={inputHandler}
      />
      <Input
        name="confirmPassword"
        htmlFor="confirmPassword"
        id="confirmPassword"
        type="password"
        placeHolder="Confirmer le mot de passe"
        onChange={inputHandler}
      />
      <Button type="submit">Créer un compte</Button>
    </form>
  );
};

export default SignupForm;
