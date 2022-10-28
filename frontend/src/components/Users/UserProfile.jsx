import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../store/useAuthContext';

import { axiosUser } from '../../utils/axios';

import classes from './UserProfile.module.scss';
import defaultProfilePicture from '../../assets/images/defaultProfilePicture.svg';

const UserProfile = (props) => {
  const { ...auth } = useAuthContext();
  const [user, setUser] = useState('');

  useEffect(() => {
    getProfil();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getProfil = async () => {
    let getFrom;

    if (props.post || props.comment) getFrom = props.userId;
    else getFrom = auth.id;

    try {
      const res = await axiosUser.get(`${getFrom}`);
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // Test user profil in HEADER, POST or COMMENT //
    <header
      className={`${props.post && classes.postUserProfile} ${
        props.comment && classes.commentUserProfile
      } ${!props.post && !props.comment && classes.userProfile}`}
    >
      {props.comment ? <span>{user.username}</span> : <h2>{user.username}</h2>}
      <div className={classes.img}>
        {!props.post && !props.comment && <p>{user.email}</p>}
        {user.profilePictureUrl ? (
          <img src={user.profilePictureUrl} alt="profil" />
        ) : (
          <img src={defaultProfilePicture} alt="profil" />
        )}
      </div>
    </header>
  );
};

export default UserProfile;
