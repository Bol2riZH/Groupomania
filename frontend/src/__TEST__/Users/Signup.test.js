import React, { useState } from 'react';
import axios from 'axios';

import ButtonTest from '../UI/Button.test';
import CardTest from '../UI/Card.test';

const SignupTest = () => {
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

  const postData = async (data) => {
    const res = await axios.post(
      'http://localhost:4000/api/auth/signup',
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );
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

    postData(formData).catch(console.error);
  };

  return (
    <CardTest>
      <h1>SIGNUP</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="profilePicture">Add a profile picture ? </label>
        <input
          id="profilePicture"
          type="file"
          accept="image/*"
          onChange={profilePictureHandler}
        />
        <label htmlFor="username">username: </label>
        <input id="username" type="text" onChange={usernameHandler} />
        <label htmlFor="email">Email: </label>
        <input id="email" type="email" onChange={emailHandler} />
        <label htmlFor="password">Password: </label>
        <input id="password" type="password" onChange={passwordHandler} />
        <label htmlFor="confirm-password">Confirm password: </label>
        <input
          id="confirm-password"
          type="password"
          onChange={confirmPasswordHandler}
        />
        <ButtonTest type="submit">Signup</ButtonTest>
      </form>
    </CardTest>
  );
};

export default SignupTest;
