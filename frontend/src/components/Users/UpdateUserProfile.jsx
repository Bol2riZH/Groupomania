import React, { useReducer, useState } from 'react';
import {
  ACTIONS,
  USER_INITIAL_STATE,
  signupReducer,
} from '../Reducer/signupReducer';

import Input from '../UI/Input';
import Button from '../UI/Button';

import { formData } from '../../data/formData';
import Error from '../UI/Error';

const UpdateUserProfile = (props) => {
  const [state, dispatch] = useReducer(signupReducer, USER_INITIAL_STATE);

  const inputHandler = (e) => {
    dispatch({
      type: ACTIONS.INPUT,
      payload:
        e.target.name === 'profilePictureUrl'
          ? { name: e.target.name, files: e.target.files[0] }
          : { name: e.target.name, value: e.target.value },
    });
  };

  const isValidHandler = (e) => {
    dispatch({
      type: ACTIONS.IS_VALID,
    });
    // state.isValidProfilPicture && props.onUpdate(formData(state));
    console.log(state.isValidProfilPicture);
    console.log(state.isValidUsername);
    if (state.isValidUsername || state.isValidProfilPicture) submitHandler(e);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.IS_VALID,
    });
    state.isValidProfilPicture && props.onUpdate(formData(state));
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
      {!state.isValidProfilPicture && (
        <Error>Taille maximum autorisé 1Mo</Error>
      )}
      <Input
        name="username"
        htmlFor="username"
        id="username"
        placeholder="Changer votre nom d'utilisateur ?"
        onChange={inputHandler}
      />
      {!state.isValidUsername && (
        <Error>Veuillez entrer un nouveau nom d'utilisateur</Error>
      )}
      {/*<Button type="submit">Confirmer</Button>*/}
      <Button onClick={isValidHandler}>Confirmer</Button>
    </form>
  );
};

export default UpdateUserProfile;
