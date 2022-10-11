import React, { useEffect, useState } from 'react';
import classes from './PostUserProfile.module.scss';

import { axiosUser } from '../../../data/axios';

import defaultProfilePicture from '../../../assets/images/defaultProfilePicture.svg';

const PostUserProfile = (props) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    getProfil().catch(console.error);
  }, []);

  const getProfil = async () => {
    try {
      const res = await axiosUser.get(`${props.userId}`);
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className={classes.userProfile}>
      <h2>{user.username}</h2>
      <div className={classes.img}>
        {user.profilePictureUrl ? (
          <img src={user.profilePictureUrl} alt="profil" />
        ) : (
          <img src={defaultProfilePicture} alt="profil" />
        )}
      </div>
    </header>
  );
};

export default PostUserProfile;
