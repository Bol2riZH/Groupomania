import React, { useEffect, useState } from 'react';
import { axiosUser } from '../../utils/axios';

import classes from './UserProfile.module.scss';
import defaultProfilePicture from '../../assets/images/defaultProfilePicture.svg';

const UserProfile = () => {
  const authLog = JSON.parse(localStorage.getItem('auth'));
  const [user, setUser] = useState('');

  useEffect(() => {
    getProfil();
  }, []);

  const getProfil = async () => {
    try {
      const res = await axiosUser.get(`${authLog?.id}`);
      setUser(res.data.user);
      console.log(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className={classes.userProfile}>
      <h2>{user.username}</h2>
      <div className={classes.img}>
        <p>{user.email}</p>
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
