import React, { useEffect, useState } from 'react';
import classes from './CommentUserProfile.module.scss';

import { axiosUser } from '../../../data/axios';

import defaultProfilePicture from '../../../assets/images/defaultProfilePicture.svg';

const CommentUserProfile = (comment) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    getProfil().catch(console.error);
  }, []);

  const getProfil = async () => {
    try {
      const res = await axiosUser.get(`${comment.userId}`);
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className={classes.userProfile}>
      <div className={classes.img}>
        {user.profilePictureUrl ? (
          <img src={user.profilePictureUrl} alt="profil" />
        ) : (
          <img src={defaultProfilePicture} alt="profil" />
        )}
      </div>
      <span>{user.username}</span>
    </header>
  );
};

export default CommentUserProfile;
