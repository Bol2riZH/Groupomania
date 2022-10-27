import React, { useReducer } from 'react';
import {
  ACTIONS,
  USER_INITIAL_STATE,
  signupReducer,
} from '../../reducer/signupReducer';

import classes from './UpdateUserProfile.module.scss';
import Input from '../UI/Input';
import Button from '../UI/Button';

import { formData } from '../../utils/formData';
import Error from '../UI/Error';
import { FaGithubAlt } from 'react-icons/fa';

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
    if (state.isValidUsername || state.isValidProfilPicture) submitHandler(e);

    if (state.username) {
      const newUsername = JSON.parse(localStorage.getItem('auth'));
      newUsername.username = state.username;
      localStorage.setItem('auth', JSON.stringify(newUsername));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.IS_VALID,
    });
    state.isValidProfilPicture && props.onUpdate(formData(state));
  };

  return (
    <form className={classes.updateUser} onSubmit={submitHandler}>
      {!state.isValidProfilPicture && (
        <Error className={classes.error}>Taille maximum autorisé 1Mo</Error>
      )}
      <Input
        className={classes.upload}
        name="profilePictureUrl"
        htmlFor="profilePicture"
        id="profilePicture"
        type="file"
        onChange={inputHandler}
        label={
          <>
            {state.profilePictureUrl ? (
              <>
                <div className={classes.profilePicture}>
                  <img
                    src={URL.createObjectURL(state.profilePictureUrl)}
                    alt="profile"
                  />
                </div>
                <p>Changer votre photo de profil ?</p>
              </>
            ) : (
              <>
                <FaGithubAlt />
                <p>Changer votre photo de profil ?</p>
              </>
            )}
          </>
        }
        isValid={state.isValidProfilPicture}
      />
      {!state.isValidUsername && (
        <Error className={classes.error}>
          Veuillez entrer un nouveau nom d'utilisateur
        </Error>
      )}
      <Input
        className={classes.input}
        name="username"
        htmlFor="username"
        id="username"
        placeholder="Changer votre nom d'utilisateur ?"
        onChange={inputHandler}
        isValid={state.isValidUsername}
      />

      <div className={classes.btnPosition}>
        <Button className={classes.btnConfirmation} onClick={isValidHandler}>
          Confirmer
        </Button>
        <Button className={classes.btn} onClick={() => props.onEditHandler()}>
          Annuler
        </Button>
      </div>
    </form>
  );
};

export default UpdateUserProfile;
