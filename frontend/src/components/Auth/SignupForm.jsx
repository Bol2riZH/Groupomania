import React, { useState, useReducer } from 'react';
import {
  ACTIONS,
  USER_INITIAL_STATE,
  signupReducer,
} from '../Reducer/signupReducer';
import { formData } from '../../utils/formData';

import classes from './SignupForm.module.scss';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Error from '../UI/Error';

import { FaEye, FaEyeSlash, FaGithubAlt } from 'react-icons/fa';

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
      {isEmptyForm && (
        <Error className={classes.errorMain}>Formulaire non remplie</Error>
      )}

      {/*/////////// PROFIL PICTURE //////////////*/}
      {!state.isValidProfilPicture ? (
        <Error className={classes.error}>Taille maximum autorisé 1Mo</Error>
      ) : (
        ''
      )}
      <Input
        className={classes.upload}
        name="profilePictureUrl"
        htmlFor="profilePicture"
        id="profilePicture"
        type="file"
        value={state}
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
                <p>Ajouter une photo de profil ?</p>
              </>
            )}
          </>
        }
        isValid={state.isValidProfilPicture}
      />

      {/*/////////// USERNAME //////////////*/}
      {!state.isValidUsername ? (
        <Error className={classes.error}>
          Veuillez entrer nom d'utilisateur
        </Error>
      ) : (
        ''
      )}
      <Input
        className={classes.input}
        name="username"
        htmlFor="username"
        id="username"
        placeholder="Nom d'utilisateur"
        value={state}
        onChange={inputHandler}
        isValid={state.isValidUsername}
      />

      {/*/////////// EMAIL //////////////*/}
      {!state.isValidEmail ? (
        <Error className={classes.error}>Veuillez entrer un email valide</Error>
      ) : (
        ''
      )}
      <Input
        className={classes.input}
        name="email"
        htmlFor="text"
        id="email"
        placeholder="Email"
        onChange={inputHandler}
        isValid={state.isValidEmail}
      />

      {/*/////////// CONFIRM EMAIL //////////////*/}
      {!state.isValidConfirmEmail ? (
        <Error className={classes.error}>
          Les adresses email ne sont pas identiques
        </Error>
      ) : (
        ''
      )}
      <Input
        className={classes.input}
        name="confirmEmail"
        htmlFor="text"
        id="confirmEmail"
        placeholder="Confirmer votre adresse mail"
        value={state}
        onChange={inputHandler}
        isValid={state.isValidConfirmEmail}
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
        className={`${classes.input} ${classes.passwordLabel}`}
        name="password"
        htmlFor="password"
        id="password"
        type={shown ? 'text' : 'password'}
        placeholder="Mot de passe"
        value={state}
        onChange={inputHandler}
        isValid={state.isValidPassword}
        label={
          !shown ? (
            <FaEyeSlash onClick={() => setShown(!shown)} />
          ) : (
            <FaEye onClick={() => setShown(!shown)} />
          )
        }
      />

      {/*/////////// CONFIRM PASSWORD //////////////*/}
      {!state.isValidConfirmPassword ? (
        <Error className={classes.error}>
          Les mot de passe ne sont pas identiques
        </Error>
      ) : (
        ''
      )}
      <Input
        className={`${classes.input} ${classes.passwordLabel}`}
        name="confirmPassword"
        htmlFor="confirmPassword"
        id="confirmPassword"
        type={shown ? 'text' : 'password'}
        placeholder="Confirmer le mot de passe"
        value={state}
        onChange={inputHandler}
        isValid={state.isValidConfirmPassword}
      />

      <div className={classes.footer}>
        <Button className={classes.btnConfirmation} type="submit">
          ENVOYER
        </Button>
        <Button className={classes.btn} onClick={props.onAccountHandler}>
          Retour
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
