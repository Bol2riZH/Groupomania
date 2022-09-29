import React, { useState } from 'react';
import CardTest from '../UI/Card.test';
import ButtonTest from '../UI/Button.test';
import axios from 'axios';

const SearchUserTest = () => {
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

  const postData = async (data) => {
    const res = await axios.post('http://localhost:4000/api/auth/search', data);
    console.log(res.data);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = dataToObj(findUserBy, user);
    postData(data).catch(console.error);
  };

  return (
    <CardTest>
      <h1>SEARCH USER</h1>
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
        <ButtonTest type="submit">Search</ButtonTest>
      </form>
    </CardTest>
  );
};

export default SearchUserTest;
