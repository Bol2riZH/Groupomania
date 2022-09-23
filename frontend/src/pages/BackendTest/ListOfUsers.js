import React, { useEffect, useState } from 'react';

import axios from 'axios';
import classes from './_ListOfUsers.module.scss';
import Card from '../../UI/Card';

const ListOfUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/auth/').then((res) => {
      setUsers(res.data.users);
      console.log(res.data.users);
    });
  }, []);

  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>
          <Card className={classes.profileCard}>
            <div>
              <h2>{user.username}</h2>
              <p>{user.email}</p>
            </div>
            <div className={classes.img}>
              <img src={user.profilePictureUrl} alt="profile picture" />
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default ListOfUsers;
