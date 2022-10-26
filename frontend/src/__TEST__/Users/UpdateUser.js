import React, { useState } from 'react';
import axios from 'axios';

import Button from '../UI/Button';
import Card from '../UI/Card';

const UpdateUser = () => {
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

  const updateData = async (id, data) => {
    const res = await axios.put(
      `http://localhost:4000/api/auth/update/${id.id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${id.token}`,
          'content-type': 'multipart/form-utils',
        },
      }
    );
    console.log(res.data);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    profilePicture && formData.append('profilePictureUrl', profilePicture);
    username && formData.append('username', username);
    email && formData.append('email', email);
    password && formData.append('password', password);
    confirmPassword && formData.append('confirmPassword', confirmPassword);

    const userId = JSON.parse(localStorage.getItem('user'));
    userId && updateData(userId, formData).catch(console.error);
  };

  return (
    <Card>
      <h1>UPDATE</h1>
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
        <Button type="submit">Update</Button>
      </form>
    </Card>
  );
};

export default UpdateUser;
