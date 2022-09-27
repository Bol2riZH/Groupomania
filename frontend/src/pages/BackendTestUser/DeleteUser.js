import React, { useState } from 'react';

import axios from 'axios';
import Card from '../../UI/Card';
import Button from '../../UI/Button';

const DeleteUser = () => {
  const [user, setUser] = useState('');
  const [findUserBy, setFindUserBy] = useState('');

  const findUserByHandler = (e) => {
    setFindUserBy(e.target.value);
  };

  const userHandler = (e) => {
    setUser(e.target.value);
  };

  const dataToObj = (key, value) => {
    if (key === 'username') return { username: value };
    else return { email: value };
  };

  const removeData = async (id, data) => {
    const res = await axios.delete('http://localhost:4000/api/auth/delete', {
      headers: {
        Authorization: `Bearer ${id.token}`,
        'content-type': 'application/json',
      },
      data: data,
    });
    console.log(res.data);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const dataObj = dataToObj(findUserBy, user);

    const userId = JSON.parse(localStorage.getItem('user'));
    userId && removeData(userId, dataObj);
  };

  return (
    <Card>
      <h1>DELETE USER</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="findUserBy">Find user by: </label>
        <select id="findUserBy" onChange={findUserByHandler}>
          <option value="">??? </option>
          <option value="username">username</option>
          <option value="email">email address</option>
        </select>
        <label htmlFor="user">
          Entered the username or email address of the user you want to delete:
        </label>
        <input id="user" type="text" onChange={userHandler} />
        <Button type="submit">Confirm</Button>
      </form>
    </Card>
  );
};

export default DeleteUser;
