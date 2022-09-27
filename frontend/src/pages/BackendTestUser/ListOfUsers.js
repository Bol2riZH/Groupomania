import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';

import Card from '../../UI/Card';
import classes from './ListOfUsers.module.scss';

const ListOfUsers = () => {
  const effectRan = useRef(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (effectRan.current === false) {
        const res = await axios.get('http://localhost:4000/api/auth/');
        setUsers(res.data.users);
      }
      effectRan.current = true;
    };
    fetchData().catch(console.error);
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
