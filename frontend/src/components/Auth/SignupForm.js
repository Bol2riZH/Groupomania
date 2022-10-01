import React, { useState } from 'react';

import axios from 'axios';
import { USER_URL } from '../../data/constants';

import Input from '../UI/Input';
import Button from '../UI/Button';

const SignupForm = (props) => {
  const [profilePicture, setProfilePicture] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEnteredEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const profilePictureHandler = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const emailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const signupHandler = async (formData) => {
    const res = await axios.post(`${USER_URL}signup`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    console.log(res.data);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('profilePictureUrl', profilePicture);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);

    // signupHandler(formData).catch(console.error);

    props.onSignup(formData);
  };

  return (
    <form onSubmit={submitHandler}>
      <Input
        htmlFor="profilePicture"
        id="profilePicture"
        type="file"
        onChange={profilePictureHandler}
      />
      <Input
        htmlFor="username"
        id="username"
        placeHolder="Nom d'utilisateur"
        onChange={usernameHandler}
      />
      <Input
        htmlFor="email"
        id="email"
        placeHolder="Email"
        onChange={emailHandler}
      />
      <Input
        htmlFor="password"
        id="password"
        type="password"
        placeHolder="Mot de passe"
        onChange={passwordHandler}
      />
      <Input
        htmlFor="confirmPassword"
        id="confirmPassword"
        type="password"
        placeHolder="Confirmer le mot de passe"
        onChange={confirmPasswordHandler}
      />
      <Button type="submit">Créer un compte</Button>
    </form>
  );
};

export default SignupForm;
