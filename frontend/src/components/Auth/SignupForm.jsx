import React, { useReducer } from 'react';
import {
  dataReducer,
  ACTIONS,
  USER_INITIAL_STATE,
} from '../Reducer/dataReducer';
import { formData } from '../../data/formData';

import Input from '../UI/Input';
import Button from '../UI/Button';

const SignupForm = (props) => {
  const [state, dispatch] = useReducer(dataReducer, USER_INITIAL_STATE);
  const [shown, setShown] = React.useState(false);

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
    props.onSignup(formData(state), state);
  };

  return (
    <form onSubmit={submitHandler}>
      <Input
        name="profilePictureUrl"
        htmlFor="profilePicture"
        id="profilePicture"
        type="file"
        value={state}
        onChange={inputHandler}
      />
      <Input
        name="username"
        htmlFor="username"
        id="username"
        placeHolder="Nom d'utilisateur"
        value={state}
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
        name="confirmEmail"
        htmlFor="confirmEmail"
        id="confirmEmail"
        placeHolder="Confirmer votre adresse mail"
        value={state}
        onChange={inputHandler}
      />
      <Input
        name="password"
        htmlFor="password"
        id="password"
        type={shown ? 'text' : 'password'}
        placeHolder="Mot de passe"
        value={state}
        onChange={inputHandler}
      />
      <Input
        name="confirmPassword"
        htmlFor="confirmPassword"
        id="confirmPassword"
        type={shown ? 'text' : 'password'}
        placeHolder="Confirmer le mot de passe"
        value={state}
        onChange={inputHandler}
      />
      <button type="button" onClick={() => setShown(!shown)}>
        voir/cacher
      </button>
      <Button type="submit">Créer un compte</Button>
    </form>
  );
};

export default SignupForm;
