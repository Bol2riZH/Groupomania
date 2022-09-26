import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import classes from './ListOfUsers.module.scss';
import Card from '../../UI/Card';

const ListOfUsers = () => {
  const effectRan = useRef(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (effectRan.current === false) {
      axios.get('http://localhost:4000/api/auth/').then((res) => {
        setUsers(res.data.users);
      });
    }
    effectRan.current = true;
  }, []);

  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>
          <Card className={classes.profileCard}>
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
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default ListOfUsers;
