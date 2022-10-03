import React, { useState } from 'react';

import Input from '../UI/Input';
import Button from '../UI/Button';

const SignupForm = (props) => {
  const [userSignup, setUserSignup] = useState({
    profilePictureUrl: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const signupHandler = (e) => {
    setUserSignup((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('profilePictureUrl', userSignup.profilePictureUrl);
    formData.append('username', userSignup.username);
    formData.append('email', userSignup.email);
    formData.append('password', userSignup.password);
    formData.append('confirmPassword', userSignup.confirmPassword);

    props.onSignup(formData, userSignup);
  };

  return (
    <form onSubmit={submitHandler}>
      <Input
        name="profilePictureUrl"
        htmlFor="profilePicture"
        id="profilePicture"
        type="file"
        onChange={signupHandler}
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
