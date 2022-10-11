import React, { useEffect, useState } from 'react';
import { axiosUser } from '../../data/axios';

import classes from '../../pages/Profile.module.scss';
import defaultProfilePicture from '../../assets/images/defaultProfilePicture.svg';

const UserProfile = () => {
  const authLog = JSON.parse(localStorage.getItem('auth'));
  const [user, setUser] = useState('');

  useEffect(() => {
    getProfil().catch(console.error);
  }, []);

  const getProfil = async () => {
    const res = await axiosUser.get(`${authLog?.id}`);
    setUser(res.data.user);
  };

  return (
    <section>
      <h2>{user.username}</h2>
      <p>{user.email}</p>
      <div className={classes.img}>
        {user.profilePictureUrl ? (
          <img src={user.profilePictureUrl} alt="profil" />
        ) : (
          <img src={defaultProfilePicture} alt="profil" />
        )}
      </div>
    </section>
  );
};

export default UserProfile;
