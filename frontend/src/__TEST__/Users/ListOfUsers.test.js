import React, { useEffect, useState } from 'react';

import axios from 'axios';

import CardTest from '../UI/Card.test';
import classes from './ListOfUsers.module.scss';

const ListOfUsersTest = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:4000/api/auth/');
      setUsers(res.data.users);
      console.log(res.data.users);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user._id}>
          <CardTest className={classes.profileCard}>
            <div className={classes.info}>
              <h2>{user.username}</h2>
              <p>{user.email}</p>
            </div>
            <div className={classes.img}>
              {user.profilePictureUrl ? (
                <img src={user.profilePictureUrl} alt="profile picture" />
              ) : (
                <img src="./defaultProfile.svg" alt="profile picture" />
              )}
            </div>
          </CardTest>
        </li>
      ))}
    </ul>
  );
};

export default ListOfUsersTest;
