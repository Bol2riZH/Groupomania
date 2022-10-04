import React, { useEffect, useState } from 'react';
import classes from './Profile.module.scss';

import { login } from '../data/axios';
import Card from '../components/UI/Card';

const Profile = () => {
  const authLog = JSON.parse(localStorage.getItem('auth'));

  const [user, setUser] = useState('');

  useEffect(() => {
    getProfil().catch(console.error);
  });

  const getProfil = async () => {
    const res = await login.get(`${authLog?.id}`);
    setUser(res.data.user);
  };

  return (
    <Card>
      <section>
        <h2>{user.username}</h2>
        <p>{user.email}</p>
        <div className={classes.img}>
          <img src={user.profilePictureUrl} alt="photo de profil" />
        </div>
      </section>
    </Card>
  );
};

export default Profile;
