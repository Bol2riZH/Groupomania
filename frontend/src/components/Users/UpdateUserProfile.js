import React, { useReducer } from 'react';
import {
  ACTIONS,
  INITIAL_STATE,
  profileReducer,
} from '../Reducer/profileReducer';

import Input from '../UI/Input';
import Button from '../UI/Button';

const UpdateUserProfile = (props) => {
  const [state, dispatch] = useReducer(profileReducer, INITIAL_STATE);

  const updateTextHandler = (e) => {
    dispatch({
      type: ACTIONS.INPUT_TEXT,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const updateFileHandler = (e) => {
    dispatch({
      type: ACTIONS.INPUT_FILE,
      payload: { name: e.target.name, files: e.target.files[0] },
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const updateUserInfo = new FormData();
    state.profilePictureUrl &&
      updateUserInfo.append('profilePictureUrl', state.profilePictureUrl);
    state.username && updateUserInfo.append('username', state.username);
    state.email && updateUserInfo.append('email', state.email);
    state.password && updateUserInfo.append('password', state.password);
    state.confirmPassword &&
      updateUserInfo.append('confirmPassword', state.confirmPassword);

    props.onUpdate(updateUserInfo);
  };

  return (
    <form onSubmit={submitHandler}>
      <Input
        name="profilePictureUrl"
        htmlFor="profilePicture"
        id="profilePicture"
        type="file"
        onChange={updateFileHandler}
      />
      <Input
        name="username"
        htmlFor="username"
        id="username"
        placeHolder="Nom d'utilisateur"
        onChange={updateTextHandler}
      />
      <Input
        name="email"
        htmlFor="email"
        id="email"
        placeHolder="Email"
        onChange={updateTextHandler}
      />
      <Input
        name="password"
        htmlFor="password"
        id="password"
        type="password"
        placeHolder="Ancien mot de passe"
        onChange={updateTextHandler}
      />
      <Input
        name="newPassword"
        htmlFor="newPassword"
        id="newPassword"
        type="password"
        placeHolder="Nouveau mot de passe"
        onChange={updateTextHandler}
      />
      <Input
        name="confirmPassword"
        htmlFor="confirmPassword"
        id="confirmPassword"
        type="password"
        placeHolder="Confirmer le mot de passe"
        onChange={updateTextHandler}
      />
      <Button type="submit">Confirmer</Button>
    </form>
  );
};

export default UpdateUserProfile;
