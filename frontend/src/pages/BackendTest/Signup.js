import React, { useState } from 'react';
import axios from 'axios';

import './_Signup.module.scss';

import Header from '../../layout/Header';
import Navigation from '../../components/Navigation';
import Button from '../../UI/Button';
import Card from '../../UI/Card';

const Signup = () => {
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

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profilePictureUrl', profilePicture);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);

    axios
      .post('http://localhost:4000/api/auth/signup', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          console.log(
            'Upload Progress: ' +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              '%'
          );
        },
      })
      .then((res) => console.log(res.data));
  };

  return (
    <Card>
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
        <input
          id="username"
          type="text"
          onChange={usernameHandler}
          defaultValue={username}
        />
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="text"
          onChange={emailHandler}
          defaultValue={email}
        />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="text"
          onChange={passwordHandler}
          defaultValue={password}
        />
        <label htmlFor="confirm-password">Confirm password: </label>
        <input
          id="confirm-password"
          type="text"
          onChange={confirmPasswordHandler}
          defaultValue={confirmPassword}
        />
        <Button type="submit">Envoyer</Button>
      </form>
    </Card>
  );
};

export default Signup;
