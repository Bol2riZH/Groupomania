import React, { useEffect, useState } from 'react';
import { login } from '../../../data/axios';

import classes from './PostUserProfile.module.scss';
import defaultProfilePicture from '../../../assets/images/defaultProfilePicture.svg';

const CommentUserProfile = (props) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    getProfil().catch(console.error);
  }, []);

  const getProfil = async () => {
    const res = await login.get(`${props.userId}`);
    setUser(res.data.user);
  };

  return (
    <header className={classes.userProfile}>
      <h2>{user.username}</h2>
      <h2>{user.userId}</h2>
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

export default CommentUserProfile;
